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
