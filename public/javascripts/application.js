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
});
