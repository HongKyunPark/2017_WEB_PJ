const express = require('express');
const Event = require('../models/event');
const Answer = require('../models/answer');
const catchErrors = require('../lib/async-error');

const router = express.Router();

// 동일한 코드가 users.js에도 있습니다. 이것은 나중에 수정합시다.
function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'Please signin first.');
    res.redirect('/signin');
  }
}

/* GET events listing. */
router.get('/', catchErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  var query = {};
  const term = req.query.term;
  if (term) {
    query = {$or: [
      {title: {'$regex': term, '$options': 'i'}},
      {location: {'$regex': term, '$options': 'i'}},
      {from: {'$regex': term, '$options': 'i'}},
      {to: {'$regex': term, '$options': 'i'}},
      {teamname: {'$regex': term, '$options': 'i'}},
      {teamcontent: {'$regex': term, '$options': 'i'}},
      {content: {'$regex': term, '$options': 'i'}},
      {price: {'$regex': term, '$options': 'i'}},
      {type: {'$regex': term, '$options': 'i'}},
      {topic: {'$regex': term, '$options': 'i'}}
    ]};
  }
  const events = await Event.paginate(query, {
    sort: {createdAt: -1},
    populate: 'author',
    page: page, limit: limit
  });
  res.render('events/index', {events: events, term: term});
}));

router.get('/new', needAuth, (req, res, next) => {
  res.render('events/new', {event: {}});
});

router.get('/:id/edit', needAuth, catchErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  res.render('events/edit', {event: event});
}));

router.get('/:id', catchErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id).populate('author');
  const answers = await Answer.find({event: event.id}).populate('author');
  event.numReads++;    // TODO: 동일한 사람이 본 경우에 Read가 증가하지 않도록???

  await event.save();
  res.render('events/show', {event: event, answers: answers});
}));

router.put('/:id', catchErrors(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    req.flash('danger', 'Not exist event');
    return res.redirect('back');
  }
  event.title = req.body.title;
  event.location = req.body.location;
  //event.time = req.body.time;
  event.from = req.body.from;
  event.to = req.body.to;
  event.teamname = req.body.teamname;
  event.teamcontent = req.body.teamcontent;
  event.content = req.body.content;
  event.price = req.body.price;
  event.type = req.body.type;
  event.topic = req.body.topic;

  await event.save();
  req.flash('success', 'Successfully updated');
  res.redirect('/events');
}));

router.delete('/:id', needAuth, catchErrors(async (req, res, next) => {
  await Event.findOneAndRemove({_id: req.params.id});
  req.flash('success', 'Successfully deleted');
  res.redirect('/events');
}));

router.post('/', needAuth, catchErrors(async (req, res, next) => {
  const user = req.user;
  //
  console.log(req.body);
  //
  var event = new Event({
    title: req.body.title,
    location: req.body.location,
    //time: req.body.time,
    from: req.body.from,
    to: req.body.to,
    teamname: req.body.teamname,
    teamcontent: req.body.teamcontent,
    author: user._id,
    content: req.body.content,
    price: req.body.price,
    type: req.body.type,
    topic: req.body.topic,
  });
  await event.save();
  //
  console.log(event);
  //
  req.flash('success', 'Successfully posted');
  res.redirect('/events');
}));

router.post('/:id/answers', needAuth, catchErrors(async (req, res, next) => {
  const user = req.user;
  const event = await Event.findById(req.params.id);

  if (!event) {
    req.flash('danger', 'Not exist event');
    return res.redirect('back');
  }

  var answer = new Answer({
    author: user._id,
    event: event._id,
    content: req.body.content
  });
  await answer.save(); //디비에 저장
  event.numAnswers++;
  await event.save();

  req.flash('success', 'Successfully answered');
  res.redirect(`/events/${req.params.id}`);
}));



module.exports = router;
