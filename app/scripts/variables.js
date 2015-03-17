var activityObject = [];
var activityObjDummy = [{"startTime":"2015-03-17 0:00 AM","endTime":"2015-03-17 10:30 AM","startTimeFormatted":"02:07am","activityId":"1","activityLabel":{"title":"Sleep","id":1,"icon":"ion-ios-moon-outline","$$hashKey":"object:19"},"today":{"month":"Mar","day":"17","week":"Tu"},"logTime":"2015-03-17T02:08:46+00:00","id":"a2bb9c3d","$$hashKey":"object:39"},{"startTime":"2015-03-17 10:45 AM","endTime":"2015-03-17 6:45 PM","startTimeFormatted":"02:07am","activityId":"2","activityLabel":{"title":"Work","id":2,"icon":"ion-ios-briefcase-outline","$$hashKey":"object:20"},"today":{"month":"Mar","day":"17","week":"Tu"},"logTime":"2015-03-17T02:09:06+00:00","id":"26d4eebd","$$hashKey":"object:44"},{"startTime":"2015-03-17 7:45 PM","endTime":"2015-03-17 10:15 PM","startTimeFormatted":"02:08am","activityId":"5","activityLabel":{"title":"Social activities","id":5,"icon":"ion-ios-people-outline","$$hashKey":"object:23"},"today":{"month":"Mar","day":"17","week":"Tu"},"logTime":"2015-03-17T02:09:24+00:00","id":"ea0c3dcd","$$hashKey":"object:49"}];
var chartistOptions = {
  donut: true,
  donutWidth: 60,
  startAngle: 360,
  total: 100,
  showLabel: true,
  width: '300px',
  height: '300px'
}


var activityGraph = {
  labels: [""],
  series: [100]
};

var activities = [{
    title: 'Sleep',
    id: 1,
    icon: 'ion-ios-moon-outline'
  }, {
    title: 'Work',
    id: 2,
    icon: 'ion-ios-briefcase-outline'
  }, {
    title: 'Eat',
    id: 3,
    icon: 'ion-ios-nutrition-outline'
  }, {
    title: 'Physical exercise',
    id: 4,
    icon: 'ion-ios-body-outline'
  }, {
    title: 'Social activities',
    id: 5,
    icon: 'ion-ios-people-outline'
  }, {
    title: 'Other Relaxation',
    id: 6,
    icon: 'ion-ios-flower-outline'
  }

];

var loadChartist;

//Global functions and variables

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
}


var createChartistObj = function(d) {
  var startTime = moment(d.startTime);
  var endTime = moment(d.endTime);
  var label = d.activityLabel.title;
  var getDuration = (endTime.diff(startTime, 'minutes') / 1440) * 100;
  console.log(getDuration);
  activityGraph.labels.splice(-1, 1);
  activityGraph.series.splice(-1, 1);
  activityGraph.labels.push(label);
  activityGraph.series.push(getDuration);

  var t = 0;
  for (i = 0; i < activityGraph.series.length; i++) {
    t = t + activityGraph.series[i]
  }
  t = 100 - t;
  activityGraph.labels.push("");
  activityGraph.series.push(t);

  // loadChartist.update(); // TODO I should test this ...
  // update(activityGraph, chartistOptions);
}

var generateUUID =function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
