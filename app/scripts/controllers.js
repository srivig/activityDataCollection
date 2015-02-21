angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ActivitiesCtrl', function($scope) {
  $scope.activities = activities;
})

.controller('HomeCtrl', function($scope){
  $scope.init = function () {
    new Chartist.Pie('.ct-chart', activityGraph, {
      donut: true,
      donutWidth: 60,
      startAngle: 360,
      total: 100,
      showLabel: true,
      width: '300px',
      height: '300px'
    });
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
    "activityId": $stateParams.activityId,
    "activityLabel": activities[$stateParams.activityId-1],
    "todayMonth": moment().format("MMM"),
    "todayDay" : moment().format("DD"),
    "todayWeek" : moment().format("dd"),
    "uitp-options1": {
      "showDuration": true,
      "show2400":true,
      "scrollDefault": "now",
      "asMoment": true
    },
    "uitp-options2": {
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


var createChartistObj = function(d){
  var startTime = moment(d.startTime);
  var endTime = moment(d.endTime);
  var label = d.activityLabel.title;
  var getDuration = (endTime.diff(startTime, 'minutes')/1440)*100;
  console.log(getDuration);
  activityGraph.labels.push(label);
  activityGraph.series.push(getDuration);
}


Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
}

var activityGraph = {
  labels : [],
  series:[]
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
