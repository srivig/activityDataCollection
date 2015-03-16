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
    // loadChartist = new Chartist.Pie('#timeWheel .ct-chart', activityGraph, chartistOptions);
  };
  var activities = activityObjDummy;
  var activities = activityObject;

  // activities.startTimeFormatted= moment(activities.startTime).format("hh:mma");
  // activities.endTimeFormatted= moment(activities.endTime).format("hh:mma");

  console.log($scope.listActivities);
  $scope.listActivities = activities;

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
    "today" : {
      "month":  moment().format("MMM"),
      "day": moment().format("DD"),
      "week": moment().format("dd"),
    }
  }
  $scope.activityData = {};
  $scope.saveData = function(d) {
    $scope.activity.logTime = moment().format();
    $scope.activity.id = generateUUID();
    $scope.activity.endTime = timePicker.endTime;
    $scope.activity.startTime = timePicker.startTime;
    activityObject.push($scope.activity);
    createChartistObj($scope.activity);
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $state.go('app.home');
  }
});
