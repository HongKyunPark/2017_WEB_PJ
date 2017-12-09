const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

var schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {type: String, trim: true, required: true},
  location: {type: String, trim: true, required: true},
  from: {type: String, trim: true, required: true},
  to: {type: String, trim: true, required: true},
  teamname: {type: String, trim: true, required: true},
  teamcontent: {type: String, trim: true, required: true},
  content: {type: String, trim: true, required: true},
  price: {type: String, trim: true, required: true},
  tags: [String],
  numLikes: {type: Number, default: 0},
  numAnswers: {type: Number, default: 0},
  numReads: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
schema.plugin(mongoosePaginate);
var Event = mongoose.model('Event', schema);

module.exports = Event;
