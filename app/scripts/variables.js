var activityObject = [];
var activityObjDummy = [{"startTime":"2015-03-16 0:00 AM","endTime":"2015-03-16 4:00 AM","startTimeFormatted":"12:39am","activityId":"1","activityLabel":{"title":"Sleep","id":1,"$$hashKey":"object:16"},"today":{"month":"Mar","day":"16","week":"Mo"},"logTime":"2015-03-16T00:40:12+00:00","id":"1ff8444a","$$hashKey":"object:47"},{"startTime":"2015-03-16 4:00 AM","endTime":"2015-03-16 7:00 AM","startTimeFormatted":"12:39am","activityId":"2","activityLabel":{"title":"Work","id":2,"$$hashKey":"object:17"},"today":{"month":"Mar","day":"16","week":"Mo"},"logTime":"2015-03-16T00:40:38+00:00","id":"08bb3962","$$hashKey":"object:48"},{"startTime":"2015-03-16 7:00 AM","endTime":"2015-03-16 8:00 AM","startTimeFormatted":"12:39am","activityId":"3","activityLabel":{"title":"Eat","id":3,"$$hashKey":"object:18"},"today":{"month":"Mar","day":"16","week":"Mo"},"logTime":"2015-03-16T00:40:57+00:00","id":"0af95ee9","$$hashKey":"object:49"},{"startTime":"2015-03-16 10:00 AM","endTime":"2015-03-16 2:00 PM","startTimeFormatted":"12:40am","activityId":"4","activityLabel":{"title":"Sports","id":4,"$$hashKey":"object:19"},"today":{"month":"Mar","day":"16","week":"Mo"},"logTime":"2015-03-16T00:41:11+00:00","id":"03812d12","$$hashKey":"object:50"}]
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
    id: 1
  }, {
    title: 'Work',
    id: 2
  }, {
    title: 'Eat',
    id: 3
  }, {
    title: 'Sports',
    id: 4
  }, {
    title: 'With friends',
    id: 5
  }, {
    title: 'Party',
    id: 6
  }, {
    title: 'Games',
    id: 7
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

  loadChartist.update(); // TODO uncomment to update chart on home
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
