angular.module('myDiaryApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {
  //TODO init functions...
  $ionicSideMenuDelegate.edgeDragThreshold(0);
})

.controller('ActivitiesCtrl', function($scope) {
  $scope.activities = activities;
})

.controller('HomeCtrl', function($scope) {
  $scope.init = function() {
    loadChartist = new Chartist.Pie('.ct-chart', activityGraph, chartistOptions);
  };
})

.controller('ActivityCtrl', function($scope, $stateParams, $state, $ionicHistory) {
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var outputDate = d.getFullYear() + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day;
  $scope.activity = {
    "startTime": moment(),
    "endTime": moment().add(1, "h"),
    "startTimeFormatted": moment().subtract(1, "minutes").format("hh:mma"),
    "activityId": $stateParams.activityId,
    "activityLabel": activities[$stateParams.activityId - 1],
    "todayMonth": moment().format("MMM"),
    "todayDay": moment().format("DD"),
    "todayWeek": moment().format("dd")
  }
  $scope.activityData = {};
  $scope.saveData = function(d) {
    $scope.activity.endTime = timePicker.endTime;
    $scope.activity.startTime = timePicker.startTime;
    console.log($scope.activity.endTime);
    createChartistObj($scope.activity);
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.home');
  }
});
