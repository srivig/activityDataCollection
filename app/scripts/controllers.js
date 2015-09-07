angular.module('myDiaryApp.controllers', ['myDiaryApp.services', 'flexcalendar', 'pascalprecht.translate'])

.controller('AppCtrl', function($scope, $rootScope, API, $ionicModal, $timeout, $ionicSideMenuDelegate, $window) {
  //TODO init functions...
  $ionicSideMenuDelegate.edgeDragThreshold(0);
})

.controller('ActivitiesCtrl', function($rootScope, API, $scope, $window) {
  if (!$rootScope.isSessionActive()) {
    $window.location.href = ('#/login');
  }
  $scope.activities = activities;
})

.controller('HomeCtrl', function($rootScope, API, $scope, $window, $ionicModal) {
    activityObject.length = 0;

    if (!$rootScope.isSessionActive()) {
      $window.location.href = ('#/login');
    }
    var userData = $rootScope.getToken();
    var today = moment().format("YYYY-MM-DD");
    $scope.events =[];
    function getData(date) {
      $rootScope.show('loading');
      API.getAll(userData, date)
        .success(function(data, status, headers, config) {
          for (var i = 0; i < data.length; i++) {
            activityObject.push(data[i]);
          }
          $rootScope.hide();
        })
        .error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    }

    function showActivity(ele){
      activityObject.length = 0;
      $("#diaryEvents").find(".selectedDate").removeClass("selectedDate");
      if (!ele.find("#lcedcapt,#lcedbody").hasClass("nowdate")) {
        ele.find("#lcedcapt,#lcedbody").addClass("selectedDate");

      }
      getData(ele.data("date"));
    }

    var events = [];
    $rootScope.hide();

    API.getDates(userData)
      .success(function(data, status, headers, config) {
        if (data.indexOf(today) == -1) {
          data.push(today);
        }
        for (var i = 0; i < data.length; i++) {
          $scope.events.push({
            date: data[i]
          });
          var singleDate = data[i].replace(/-/g, '');
          $("." + singleDate).addClass("hasData").data("date", data[i]);
          $("." + singleDate).find("#lcedval").addClass("hasActivities");
        }

        getData(today);
        $("#diaryEvents .hasData").on('click touchstart', function() {
          var ele = $(this);
          showActivity(ele);
        });

      $ionicModal.fromTemplateUrl('calendar-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      $rootScope.hide();

      })
      .error(function(data, status, headers, config) {
        $rootScope.hide();
        $rootScope.notify("Oops something went wrong!! Please try again later");
      });

      $scope.options = {
        defaultDate: today,
        /*minDate: new Date([2015, 06, 9]),
        maxDate: new Date([2015, 12, 31]),*/
        dayNamesLength: 1,
        eventClick: function(date) {
          var formattedDate = moment(date).format("YYYY-MM-DD");
          var formattedDateClass = moment(date).format("YYYYMMDD");
          var ele = $("."+formattedDateClass);
          showActivity(ele);
          $scope.closeModal();
          /*this.options.defaultDate = date;*/
        },
        dateClick: function(date) {
          /*console.log(date);*/
        },
        changeMonth: function(month) {
          /*console.log(month);*/
        }
      };
      $scope.init = function() {};




    $scope.listActivities = activityObject;


  })
  .controller('SignInCtrl', function($rootScope, $scope, API, $window) {
    // if the user is already logged in, take him to home
    if ($rootScope.isSessionActive()) {
      $window.location.href = ('#/app/home');
    }

    $scope.user = {
      email: "",
      password: ""
    };

    $scope.validateUser = function() {
      var email = this.user.email;
      var password = this.user.password;
      if (!email || !password) {
        $rootScope.notify("Please enter valid credentials");
        return false;
      }
      $rootScope.show('Please wait.. Authenticating');
      API.signin({
        email: email,
        password: password
      }).success(function(data) {
        $rootScope.setToken(email); // create a session kind of thing on the client side
        $rootScope.hide();
        $window.location.href = ('#/app/home');
      }).error(function(error) {
        $rootScope.hide();
        $rootScope.notify("Invalid Username or password");
      });
    }

  })

.controller('SignUpCtrl', function($rootScope, $scope, API, $window) {
  $scope.user = {
    email: "",
    password: "",
    name: ""
  };

  $scope.createUser = function() {
    var email = this.user.email;
    var password = this.user.password;
    var uName = this.user.name;
    if (!email || !password || !uName) {
      $rootScope.notify("Please enter valid data");
      return false;
    }
    $rootScope.show('Please wait.. Registering');
    API.signup({
      email: email,
      password: password,
      name: uName
    }).success(function(data) {
      $rootScope.setToken(email); // create a session kind of thing on the client side
      $rootScope.hide();
      $window.location.href = ('#/app/home');
    }).error(function(error) {
      $rootScope.hide();
      if (error.error && error.error.code == 11000) {
        $rootScope.notify("A user with this email already exists");
      } else {
        $rootScope.notify("Oops something went wrong, Please try again!");
      }

    });
  }
})

.controller('ActivityCtrl', function($scope, $rootScope, API, $stateParams, $state, $ionicHistory, $window) {
  if (!$rootScope.isSessionActive()) {
    $window.location.href = ('#/login');
  }
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
    "today": {
      "month": moment().format("MMM"),
      "day": moment().format("DD"),
      "week": moment().format("dd"),
      "year": moment().format("YYYY"),

    }
  }
  $scope.activityData = {};
  $scope.createNew = function(d) {
    $rootScope.show();
    $scope.activity.logTime = moment().format();
    $scope.activity.id = generateUUID();
    $scope.activity.endTime = timePicker.endTime;
    $scope.activity.startTime = timePicker.startTime;
    $scope.activity.startDate = $scope.activity.startTime.substring(0, 10);
    $scope.activity.user = $rootScope.getToken();

    API.saveItem($scope.activity, $scope.activity.user)
      .success(function(data, status, headers, config) {
        activityObject.push($scope.activity);
        createChartistObj($scope.activity);
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.home');
        $rootScope.hide();
        $rootScope.doRefresh(1);
      })
      .error(function(data, status, headers, config) {
        $rootScope.hide();
        $rootScope.notify("Oops something went wrong!! Please try again later");
      });

  }
});
