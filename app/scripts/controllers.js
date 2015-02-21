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

.controller('ActivityCtrl', function($scope, $stateParams) {
  var d = new Date();

  var month = d.getMonth() + 1;
  var day = d.getDate();

  var outputDate = d.getFullYear() + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day;

  $scope.activity = {
    "startTime": new Date(),
    "endTime": new Date().addHours(1),
    "activityId": $stateParams.activityId,
    "activityLabel": activities[$stateParams.activityId-1],
    "today": outputDate,
    "uitp-options1": {
      "showDuration": true,
      "show2400":true,
      "scrollDefault": "now",
      "asMoment": false
    },
    "uitp-options2": {
      "showDuration": true,
      "asMoment": false
    }
  }


});

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
}

var activityGraph = [];

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
