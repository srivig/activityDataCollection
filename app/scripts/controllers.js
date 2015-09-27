angular.module('myDiaryApp.controllers', ['myDiaryApp.services', 'flexcalendar', 'pascalprecht.translate'])

.controller('AppCtrl', function($scope, $rootScope, API, $ionicModal, $timeout, $ionicSideMenuDelegate, $window) {
  //TODO init functions...
  $ionicSideMenuDelegate.edgeDragThreshold(0);
})

/**--------------------------------------------
General Activities Control
--------------------------------------------**/
.controller('ActivitiesCtrl', function($rootScope, API, $scope, $window, $stateParams) {
  if (!$rootScope.isSessionActive()) {
    $window.location.href = ('#/login');
  }
  var dateParam = $stateParams.date;
  $scope.activities = activities;
  $scope.date = dateParam != "" ? dateParam : moment().format("x");
  var activityDate = moment(parseInt($stateParams.date));
  timePicker.today = activityDate.format("YYYY-MM-DD"); //change the var TODAY to appropriate name, 'timePicker' is a global variable, find it inside timeslider.js
})

/**--------------------------------------------
 Controller for Homepage functions
--------------------------------------------**/

.controller('HomeCtrl', function($rootScope, API, $scope, $window, $ionicModal) {
  $rootScope.show('loading');
  activityObject.length = 0;

  /* User auth */
  if (!$rootScope.isSessionActive()) {
    $window.location.href = ('#/login');
  }

  var userData = $rootScope.getToken();
  var today = moment().format("YYYY-MM-DD");
  $scope.todayTimestamp = moment().format("x");
  $scope.events = [];

  /* Function to get activity data from mongodb server based on the dates */
  var count = 0;
  function getData(date,dataLength) {
    /**/
    API.getAll(userData, date)
      .success(function(data, status, headers, config) {


        /* Date header (eg. 13 September 2015)  */
        var dateHeader = {};
        dateHeader.day = moment(date).format("DD");
        dateHeader.month = moment(date).format("MMM");
        dateHeader.year = moment(date).format("YYYY");
        dateHeader.isHeader = true;

        /* Add data to activityObject. NP: unshift to add the data in reverse  */
        for (var i = 0; i < data.length; i++) {
          activityObject.unshift(data[i]);
        }
        activityObject.unshift(dateHeader);
        count++;
        if(count == dataLength){
          $rootScope.hide();
          count=0;
        }


      }) /* TODO : Handle exceptions  */
      .error(function(data, status, headers, config) {
        /*$rootScope.hide();*/
        $rootScope.notify("Oops something went wrong!! Please try again later");
      });
  }

  /* Display activity in calendar - NOTE : REMOVE THIS FUNCTION SOON, THIS FEATURE IS REMOVED*/
  /*function showActivity(ele) {
    activityObject.length = 0;
    $("#diaryEvents").find(".selectedDate").removeClass("selectedDate");
    if (!ele.find("#lcedcapt,#lcedbody").hasClass("nowdate")) {
      ele.find("#lcedcapt,#lcedbody").addClass("selectedDate");

    }
    getData(ele.data("date"));
  }*/

  /* scope method to create new activity */
  $scope.createNewActivity = function(date) {
    date = date == "today" ? moment() : date;
    $scope.closeModal();
    $window.location.href = ('#/app/activities/' + date);
  }

  /* scope method to update new activity */
  $scope.viewActivity = function(activityUID) {
    $window.location.href = ('#/app/existing/' + activityUID);
  }

  var events = []; //variable to flex-calendar event scope
  /*$rootScope.hide();*/

  /* Function to get all the dates that contains data (with a spererate condition of today's date, this should be handled properly) */
  API.getDates(userData).success(function(data, status, headers, config) {
      /*if (data.indexOf(today) == -1) {
        data.push(today);
      }*/

      /*to sort the date by recent first order*/
      data.sort(function(b,a){
        // to get a value that is either negative, positive, or zero.
        return moment(b).toDate() - moment(a).toDate();
      });

      for (var i = 0; i < data.length; i++) {
        $scope.events.push({
          date: data[i]
        });
        /*Function call to get data, multiple calls to server, needed for lazy loading in future*/
        getData(data[i],data.length);
        if(i==(data.length-1)){
          /*$rootScope.hide();*/
        }
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



    }) /* TODO : Handle exceptions  */
    .error(function(data, status, headers, config) {
      /*$rootScope.hide();*/
      $rootScope.notify("Oops something went wrong!! Please try again later");
    }) ;

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
    changeMonth: function(month) {}
  };

  $scope.init = function() {};
  $scope.listActivities = activityObject;


})

.controller('existingActivityCtrl', function($rootScope, API, $scope, $window, $ionicModal, $stateParams) {
  /* User auth */
  if (!$rootScope.isSessionActive()) {
    $window.location.href = ('#/login');
  }
  $rootScope.show();

  var userData = $rootScope.getToken();
  /* scope method to update new activity */
  API.getExisting(userData, $stateParams.activityUID)
    .success(function(data, status, headers, config) {
      $scope.activity = data[0];
      $rootScope.hide();

    }) /* TODO : Handle exceptions  */
    .error(function(data, status, headers, config) {
      $rootScope.hide();
      $rootScope.notify("Oops something went wrong!! Please try again later");
    });

  $scope.updateActivity = function(activityID, date, activityCatId) {
    date = moment(date).format("x");
    $window.location.href = ('#/app/activities/' + activityCatId + '/' + date + "?update=true&id=" + activityID);
  }

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
  var isUpdateReq = Boolean(gup("update", location.hash)),
    activityDataId = gup("id", location.hash);
  $scope.update = isUpdateReq ? true : false;
  var activityDate = moment(parseInt($stateParams.date));
  timePicker.today = activityDate.format("YYYY-MM-DD"); //change the var TODAY to appropriate name, 'timePicker' is a global variable, find it inside timeslider.js
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
  if (isUpdateReq) {
    $rootScope.show();
    API.getExisting($rootScope.getToken(), activityDataId)
      .success(function(data, status, headers, config) {
        $scope.activity = data[0];
        $scope.startTimeMinutes = 1440 - (parseInt(moment(data[0].startTime).format("mm")) + parseInt(moment(data[0].startTime).format("HH") * 60));
        $scope.endTimeMinutes = 1440 - (parseInt(moment(data[0].endTime).format("mm")) + parseInt(moment(data[0].endTime).format("HH") * 60));
        console.log($scope.startTimeMinutes);
        console.log($scope.endTimeMinutes);
        $("#slider-range").empty();
        timeSlider($scope.startTimeMinutes, $scope.endTimeMinutes);
        $rootScope.hide();

      }) /* TODO : Handle exceptions  */
      .error(function(data, status, headers, config) {
        $rootScope.hide();
        $rootScope.notify("Oops something went wrong!! Please try again later");
      });
    $scope.createNew = function() {
      $rootScope.show();
      $scope.activity.logTime = moment().format();
      $scope.activity.endTime = timePicker.endTime;
      $scope.activity.startTime = timePicker.startTime;
      $scope.activity.startDate = $scope.activity.startTime.substring(0, 10);
      $scope.activity.user = $rootScope.getToken();
      API.putItem($scope.activity._id,$scope.activity, $rootScope.getToken())
        .success(function(data, status, headers, config) {

          $rootScope.hide();
          $ionicHistory.nextViewOptions({
            disableBack: true
          });

          $rootScope.hide("Updated");
          $state.go('app.home');
          /*$rootScope.doRefresh(1);*/

        }) /* TODO : Handle exceptions  */
        .error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("Oops something went wrong!! Please try again later");
        });

    }
  } else {

    $("#slider-range").empty();
    timeSlider(1440, 840);

    $scope.activityData = {};
    $scope.createNew = function() {
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
          window.location.reload();

        })
        .error(function(data, status, headers, config) {
          $rootScope.hide();
          $rootScope.notify("Oops something went wrong!! Please try again later");
        });
    }
  }



});
