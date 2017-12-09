$(function() {
  $('.need-confirm-btn').click(function() {
    if (confirm('Are you sure to delete?')) {
      return true;
    }
    return false;
  });
});

$(function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#from" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });

    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }

      return date;
    }
});

$(function() {
    $('input[name="daterange"]').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        locale: {
            format: 'MM/DD/YYYY h:mm A'
        }
    });
});

$(function($){
  $(".button-group button.free").click(function(e){
    $(".form-group.fee input").attr("readonly",true);
    $(".form-group.fee input").toggle();
    $(".form-group.fee input").val("무료");
  })

  $(".button-group button.paid").click(function(e){
    $(".form-group.fee input").attr("readonly",false);
    $(".form-group.fee input").toggle();
    $(".form-group.fee input").val("");

  })

///////////////////////////////////////////
  $(".button-group button.camp").click(function(e){
    $(".form-group.type input").attr("readonly",true);
    $(".form-group.type input").toggle();
    $(".form-group.type input").val("캠프");
  })
  $(".button-group button.trip").click(function(e){
    $(".form-group.type input").attr("readonly",true);
    $(".form-group.type input").toggle();
    $(".form-group.type input").val("여행");
  })
  $(".button-group button.festival").click(function(e){
    $(".form-group.type input").attr("readonly",true);
    $(".form-group.type input").toggle();
    $(".form-group.type input").val("축제");
  })
  $(".button-group button.dinner").click(function(e){
    $(".form-group.type input").attr("readonly",true);
    $(".form-group.type input").toggle();
    $(".form-group.type input").val("저녁식사");
  })
  $(".button-group button.seminar").click(function(e){
    $(".form-group.type input").attr("readonly",true);
    $(".form-group.type input").toggle();
    $(".form-group.type input").val("세미나");
  })
  $(".button-group button.else").click(function(e){
    $(".form-group.type input").attr("readonly",true);
    $(".form-group.type input").toggle();
    $(".form-group.type input").val("기타");
  })

/////////////////////////////////////////////
  $(".button-group button.business").click(function(e){
    $(".form-group.topic input").attr("readonly",true);
    $(".form-group.topic input").toggle();
    $(".form-group.topic input").val("비즈니스");
  })
  $(".button-group button.family").click(function(e){
    $(".form-group.topic input").attr("readonly",true);
    $(".form-group.topic input").toggle();
    $(".form-group.topic input").val("가족");
  })
  $(".button-group button.food").click(function(e){
    $(".form-group.topic input").attr("readonly",true);
    $(".form-group.topic input").toggle();
    $(".form-group.topic input").val("음식");
  })
  $(".button-group button.health").click(function(e){
    $(".form-group.topic input").attr("readonly",true);
    $(".form-group.topic input").toggle();
    $(".form-group.topic input").val("건강");
  })
  $(".button-group button.home").click(function(e){
    $(".form-group.topic input").attr("readonly",true);
    $(".form-group.topic input").toggle();
    $(".form-group.topic input").val("집");
  })
  $(".button-group button.music").click(function(e){
    $(".form-group.topic input").attr("readonly",true);
    $(".form-group.topic input").toggle();
    $(".form-group.topic input").val("음악");
  })
  $(".button-group button.sports").click(function(e){
    $(".form-group.topic input").attr("readonly",true);
    $(".form-group.topic input").toggle();
    $(".form-group.topic input").val("스포츠");
  })
  $(".button-group button.other").click(function(e){
    $(".form-group.topic input").attr("readonly",true);
    $(".form-group.topic input").toggle();
    $(".form-group.topic input").val("기타");
  })

});
