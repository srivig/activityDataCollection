$(document).ready(function(){


  $("#slider-range").slider({
      orientation: "vertical",
      range: true,
      min: 0,
      max: 1440,
      step: 15,
      values: [840, 1440],
      create: function(){
      var  _sliderButton = "#time-range .ui-slider-handle.ui-state-default.ui-corner-all",
      _timeRangeVerticalContainer = "#time-range .ui-slider-vertical",
      _timeTickContainer = "<div class='timeTickContainer'></div>",
      _timeTick = "<div class='timeTick'></div>",
      verticalContainerHeight;
      _timeTickContainer = $(_timeTickContainer);
      _timeTick = $(_timeTick);



      //add cool slider buttons

      $(_sliderButton).each(function(){

          var lineHTML = "<div class='sliderButtonLine'></div>",
          timeHTML = "<div class='sliderButtonTime'></div>";

          $(this).append($(lineHTML)).append($(timeHTML));
          $(_timeRangeVerticalContainer).height($(window).height()-110);
      });

      verticalContainerHeight = Math.round($(_timeRangeVerticalContainer).height());
      _timeTick.height(verticalContainerHeight/24);
      //add ticks
      for(var i = 0;  i < 23 ; i++){
        var div = _timeTick.clone();
        if(i===12){
          div.append('<span class="tickText">12:00 PM</span>');
          div.width(100);
        }
        _timeTickContainer.append(div);

      }


      $(_timeRangeVerticalContainer).prepend(_timeTickContainer);

        // this should be dynamic
        $($(_sliderButton + " .sliderButtonTime")[1]).text('00:00 AM');
        $($(_sliderButton + " .sliderButtonTime")[0]).text('10:00 AM');

      },
      slide: function (e, ui) {
          var hours1 = Math.floor((1440-ui.values[0]) / 60);
          var minutes1 = (1440-ui.values[0]) - (hours1 * 60);

          if (hours1.length == 1) hours1 = '0' + hours1;
          if (minutes1.length == 1) minutes1 = '0' + minutes1;
          if (minutes1 == 0) minutes1 = '00';
          if (hours1 >= 12) {
              if (hours1 == 12) {
                  hours1 = hours1;
                  minutes1 = minutes1 + " PM";
              } else {
                  hours1 = hours1 - 12;
                  minutes1 = minutes1 + " PM";
              }
          } else {
              hours1 = hours1;
              minutes1 = minutes1 + " AM";
          }
          if (hours1 == 0) {
              hours1 = 12;
              minutes1 = minutes1;
          }



          // $('.slider-time').html(hours1 + ':' + minutes1);

          $($(".ui-slider-handle.ui-state-default.ui-corner-all .sliderButtonTime")[0]).text(hours1 + ':' + minutes1);

          var hours2 = Math.floor((1440-ui.values[1]) / 60);
          var minutes2 = (1440-ui.values[1]) - (hours2 * 60);

          if (hours2.length == 1) hours2 = '0' + hours2;
          if (minutes2.length == 1) minutes2 = '0' + minutes2;
          if (minutes2 == 0) minutes2 = '00';
          if (hours2 >= 12) {
              if (hours2 == 12) {
                  hours2 = hours2;
                  minutes2 = minutes2 + " PM";
              } else if (hours2 == 24) {
                  hours2 = 11;
                  minutes2 = "59 PM";
              } else {
                  hours2 = hours2 - 12;
                  minutes2 = minutes2 + " PM";
              }
          } else {
              hours2 = hours2;
              minutes2 = minutes2 + " AM";
          }

          // $('.slider-time2').html(hours2 + ':' + minutes2);
          $($(".ui-slider-handle.ui-state-default.ui-corner-all .sliderButtonTime")[1]).text(hours2 + ':' + minutes2);

      }
  });



})
