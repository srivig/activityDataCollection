angular.module('myDiaryApp.controllers', ['myDiaryApp.services', 'flexcalendar', 'pascalprecht.translate'])

.controller('AppCtrl', function($scope, $rootScope, API, $ionicModal, $timeout, $ionicSideMenuDelegate, $window) {
  //TODO init functions...
  $ionicSideMenuDelegate.edgeDragThreshold(0);
})

/**--------------------------------------------
General Activities Control
--------------------------------------------**/
.controller('ActivitiesCtrl', function($rootScope, API, $scope, $window,  $stateParams) {
  if (!$rootScope.isSessionActive()) {
    $window.location.href = ('#/login');
  }
  var dateParam = $stateParams.date;
  $scope.activities = activities;
  $scope.date = dateParam != ""? dateParam:moment().format("x");
  var activityDate = moment(parseInt($stateParams.date));
  timePicker.today= activityDate.format("YYYY-MM-DD"); //change the var TODAY to appropriate name, 'timePicker' is a global variable, find it inside timeslider.js
})

/**--------------------------------------------
 Controller for Homepage functions
--------------------------------------------**/

.controller('HomeCtrl', function($rootScope, API, $scope, $window, $ionicModal) {
    activityObject.length = 0;

    /* User auth */
    if (!$rootScope.isSessionActive()) {
      $window.location.href = ('#/login');
    }

    var userData = $rootScope.getToken();
    var today = moment().format("YYYY-MM-DD");
    $scope.todayTimestamp = moment().format("x");
    $scope.events =[];

    /* Function to get activity data from mongodb server based on the dates */
    function getData(date) {
      $rootScope.show('loading');
      API.getAll(userData, date)
        .success(function(data, status, headers, config) {


          /* Date header (eg. 13 September 2015)  */
          var dateHeader = {};
          dateHeader.day =  moment(date).format("DD");
          dateHeader.month = moment(date).format("MMM");
          dateHeader.year = moment(date).format("YYYY");
          dateHeader.isHeader = true;

          /* Add data to activityObject. NP: unshift to add the data in reverse  */
          for (var i = 0; i < data.length; i++) {
            activityObject.unshift(data[i]);
          }
          activityObject.unshift(dateHeader);
          $rootScope.hide();

        }) /* TODO : Handle exceptions  */
        .error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    }

    /* Display activity in calendar - NOTE : REMOVE THIS FUNCTION SOON, THIS FEATURE IS REMOVED*/
    function showActivity(ele){
      activityObject.length = 0;
      $("#diaryEvents").find(".selectedDate").removeClass("selectedDate");
      if (!ele.find("#lcedcapt,#lcedbody").hasClass("nowdate")) {
        ele.find("#lcedcapt,#lcedbody").addClass("selectedDate");

      }
      getData(ele.data("date"));
    }

    /* scope method to create new activity */
    $scope.createNewActivity = function(date){
      date = date=="today"? moment():date;
      $scope.closeModal();
      $window.location.href = ('#/app/activities/'+date);
    }

    /* scope method to update new activity */
    $scope.updateActivity = function(date, activityID){

    }

    var events = []; //variable to flex-calendar event scope
    $rootScope.hide();

    /* Function to get all the dates that contains data (with a spererate condition of today's date, this should be handled properly) */
    API.getDates(userData).success(function(data, status, headers, config) {
          if (data.indexOf(today) == -1) {
            data.push(today);
          }

          for (var i = 0; i < data.length; i++) {
            $scope.events.push({
              date: data[i]
            });

            /* remove the following snippet soon, this feature is removed */
            var singleDate = data[i].replace(/-/g, '');
            $("." + singleDate).addClass("hasData").data("date", data[i]);
            $("." + singleDate).find("#lcedval").addClass("hasActivities");

            /*Function call to get data, multiple calls to server, needed for lazy loading in future*/
            getData(data[i]);
          }

          /*remove the following snippet, this feature is removed */
          $("#diaryEvents .hasData").on('click touchstart', function() {
            var ele = $(this);
            showActivity(ele);
          });

          /* Load flexcalendar */
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

      })/* TODO : Handle exceptions  */
      .error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("Oops something went wrong!! Please try again later");
      });

      /* Options for flexcalendar */
      $scope.options = {
        defaultDate: today,
        dayNamesLength: 1,
        eventClick: function(date) {
          /*var formattedDate = moment(date).format("YYYY-MM-DD");
          var formattedDateClass = moment(date).format("YYYYMMDD");
          var ele = $("."+formattedDateClass);
          showActivity(ele);
          $scope.closeModal();*/
          $scope.createNewActivity(moment(date).format("x"));
        },
        dateClick: function(date) {
            $scope.createNewActivity(moment(date).format("x"));
        },
        changeMonth: function(month) {
        }
      };

      $scope.init = function() {};
      $scope.listActivities = activityObject;


  })

  /**--------------------------------------------
   Controller for signing in functions - TODO: add better security
  --------------------------------------------**/
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

  /**--------------------------------------------
   Controller for signup functions - TODO: add better security
  --------------------------------------------**/
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


/**--------------------------------------------
 Controller for adding a new activity - saving it to Mongodb database
--------------------------------------------**/

.controller('ActivityCtrl', function($scope, $rootScope, API, $stateParams, $state, $ionicHistory, $window) {
  if (!$rootScope.isSessionActive()) {
    $window.location.href = ('#/login');
  }
  console.log($stateParams.date);
  var activityDate = moment(parseInt($stateParams.date));
  timePicker.today= activityDate.format("YYYY-MM-DD"); //change the var TODAY to appropriate name, 'timePicker' is a global variable, find it inside timeslider.js
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var outputDate = d.getFullYear() + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day;

  $scope.activity = {
    "startTime": activityDate,
    "endTime": activityDate.add(1, "h"),
    "startTimeFormatted": activityDate.subtract(1, "minutes").format("hh:mma"),
    "activityId": $stateParams.activityId,
    "activityLabel": activities[$stateParams.activityId - 1],
    "today": {
      "month": activityDate.format("MMM"),
      "day": activityDate.format("DD"),
      "week": activityDate.format("dd"),
      "year": activityDate.format("YYYY"),
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
