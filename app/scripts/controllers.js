angular.module('starter.controllers', ['ui.timepicker'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {
 //TODO init functions...
 $ionicSideMenuDelegate.edgeDragThreshold(0);
})

.controller('ActivitiesCtrl', function($scope) {
  $scope.activities = activities;
})

.controller('HomeCtrl', function($scope){
  $scope.init = function () {
    loadChartist =  new Chartist.Pie('.ct-chart', activityGraph, chartistOptions);
  };
})

.controller('ActivityCtrl', function($scope, $stateParams, $state, $ionicViewService) {
  var d = new Date();

  var month = d.getMonth() + 1;
  var day = d.getDate();

  var outputDate = d.getFullYear() + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day;

  $scope.activity = {
    "startTime": moment(),
    "endTime": moment().add(1,"h"),
    "startTimeFormatted" : moment().subtract(1,"minutes").format("hh:mma"),
    "activityId": $stateParams.activityId,
    "activityLabel": activities[$stateParams.activityId-1],
    "todayMonth": moment().format("MMM"),
    "todayDay" : moment().format("DD"),
    "todayWeek" : moment().format("dd"),
    "uitpOptions1": {
      showDuration: true,
      show2400:true,
      //scrollDefault: 'now',
      asMoment: true,
      step: 20,
    timeFormat: 'g:ia'
    },
    "uitpOptions2": {
      "showDuration": true,
      "asMoment": true
    }
  }
  $scope.activityData = {};

  $scope.saveData = function(d){
    console.log($scope.activity) ;
    createChartistObj($scope.activity);
    $ionicViewService.nextViewOptions({
     disableBack: true
    });
    $state.go('app.home');
  }


});


//Global functions and variables

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
}


var loadChartist;

var createChartistObj = function(d){
  var startTime = moment(d.startTime);
  var endTime = moment(d.endTime);
  var label = d.activityLabel.title;
  var getDuration = (endTime.diff(startTime, 'minutes')/1440)*100;
  console.log(getDuration);
  activityGraph.labels.splice(-1,1);
  activityGraph.series.splice(-1,1);
  activityGraph.labels.push(label);
  activityGraph.series.push(getDuration);

  var t = 0;
  for (i = 0; i < activityGraph.series.length; i++) {
    t = t + activityGraph.series[i]
  }
  t=100-t;
  activityGraph.labels.push("");
  activityGraph.series.push(t);

  loadChartist.update();

  // update(activityGraph, chartistOptions);
}

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
  labels : [""],
  series:[100]
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

//
// angular.module('ui.timepicker').value('uiTimepickerConfig',{
//   "showDuration": true,
//   "show2400":true,
//   "scrollDefault": "now",
//   "asMoment": false
// });
