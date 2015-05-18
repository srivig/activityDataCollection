var timePicker = {
    startTime: "",
    endTime: "",
    today: moment().format("YYYY-MM-DD"),
    defaultStartTime: '0:00 AM',
    defaultEndTime: '10:00 AM'

}


var timeSlider = function(startTime, endTime) {
    if ($("#slider-range").slider("instance") !== undefined) {
        $("#slider-range").slider("destroy");
    }

    if (activityObject.length > 0) {
        startTime = getDuration();
        endTime = startTime - 300;
    }

    $("#slider-range").slider({
        orientation: "vertical",
        range: true,
        min: 0,
        max: 1440,
        step: 15,
        values: [endTime, startTime],
        create: function(e) {
            var _sliderButton = "#time-range .ui-slider-handle.ui-state-default.ui-corner-all",
                _timeRangeVerticalContainer = "#time-range .ui-slider-vertical",
                _timeTickContainer = "<div class='timeTickContainer'></div>",
                _timeTick = "<div class='timeTick'></div>",
                verticalContainerHeight,
                ui,
                $timeTickContainer = $(_timeTickContainer),
                $timeTick = $(_timeTick);

            //add cool slider buttons
            $(_sliderButton).each(function() {
                var lineHTML = "<div class='sliderButtonLine'></div>",
                    timeHTML = "<div class='sliderButtonTime'></div>";
                $(this).append($(lineHTML)).append($(timeHTML));
                $(_timeRangeVerticalContainer).height($(window).height() - 110);
            });
            verticalContainerHeight = Math.round($(_timeRangeVerticalContainer).height());
            $timeTick.height(verticalContainerHeight / 24);

            //add ticks
            for (var i = 0; i < 23; i++) {
                var div = $timeTick.clone();
                if (i === 12) {
                    div.append('<span class="tickText">12:00 PM</span>');
                    div.width(100);
                }
                $timeTickContainer.append(div);
            }

            $(_timeRangeVerticalContainer).prepend($timeTickContainer);

            ui = {
                values: [endTime, startTime]
            }
            setStartTime(ui);
            setEndTime(ui)

        },
        slide: function(e, ui) {
            /*--------Start time ----------*/
            setStartTime(ui);
            /*--------End time ----------*/
            setEndTime(ui)
        }
    });

    function setStartTime(ui) {
        var startTimeHours, startTimeMinutes,sTime;
        startTimeHours = Math.floor((1440 - ui.values[1]) / 60);
        startTimeMinutes = (1440 - ui.values[1]) - (startTimeHours * 60);
        if (startTimeHours.length == 1) startTimeHours = '0' + startTimeHours;
        if (startTimeMinutes.length == 1) startTimeMinutes = '0' + startTimeMinutes;
        if (startTimeMinutes == 0) startTimeMinutes = '00';
        if (startTimeHours >= 12) {
            if (startTimeHours == 12) {
                startTimeHours = startTimeHours;
                startTimeMinutes = startTimeMinutes + " PM";
            } else if (startTimeHours == 24) {
                startTimeHours = 11;
                startTimeMinutes = "59 PM";
            } else {
                startTimeHours = startTimeHours - 12;
                startTimeMinutes = startTimeMinutes + " PM";
            }
        } else {
            startTimeHours = startTimeHours;
            startTimeMinutes = startTimeMinutes + " AM";
        }

        sTime = startTimeHours + ':' + startTimeMinutes;
        $($(".ui-slider-handle.ui-state-default.ui-corner-all .sliderButtonTime")[1]).text(startTimeHours + ':' + startTimeMinutes);
        timePicker.startTime = timePicker.today + " " + sTime;


    }

    function setEndTime(ui) {
        var endTimeHours, endTimeMinutes,eTime;

        endTimeHours = Math.floor((1440 - ui.values[0]) / 60);
        endTimeMinutes = (1440 - ui.values[0]) - (endTimeHours * 60);
        if (endTimeHours.length == 1) endTimeHours = '0' + endTimeHours;
        if (endTimeMinutes.length == 1) endTimeMinutes = '0' + endTimeMinutes;
        if (endTimeMinutes == 0) endTimeMinutes = '00';
        if (endTimeHours >= 12) {
            if (endTimeHours == 12) {
                endTimeHours = endTimeHours;
                endTimeMinutes = endTimeMinutes + " PM";
            } else {
                endTimeHours = endTimeHours - 12;
                endTimeMinutes = endTimeMinutes + " PM";
            }
        } else {
            endTimeHours = endTimeHours;
            endTimeMinutes = endTimeMinutes + " AM";
        }
        if (endTimeHours == 0) {
            endTimeHours = 12;
            endTimeMinutes = endTimeMinutes;
        }

        $($(".ui-slider-handle.ui-state-default.ui-corner-all .sliderButtonTime")[0]).text(endTimeHours + ':' + endTimeMinutes);
        eTime = (endTimeHours + ':' + endTimeMinutes);
        timePicker.endTime = timePicker.today + " " + eTime;
    }

    function getDuration() {
      var duration,lastEndTime,midNight;
        lastEndTime = activityObject[activityObject.length - 1].endTime;
        midNight = moment().format("YYYY-MM-DD 12:00") + " AM";
        duration = moment.duration(moment(lastEndTime).diff(moment(midNight)));
        return 1440 - Math.round(duration.asMinutes() / 10) * 10;
    }
}
