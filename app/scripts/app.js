// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


var myDiaryApp = angular.module('myDiaryApp', ['ionic', 'myDiaryApp.controllers', 'UserApp','chart.js'])

.run(function($ionicPlatform, user) {
  $ionicPlatform.ready(function() {

    // user.init({
    //   appId: '54e3f3d8f275b'
    // });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    data: {
      login: false
    }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    data: {
      public: true
    }
  })

    .state('app.activities', {
      url: "/activities",
      views: {
        'menuContent': {
          templateUrl: "templates/activities.html",
          controller: 'ActivitiesCtrl'
        }
      }
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.home2', {
      url: "/home2",
      views: {
        'menuContent': {
          templateUrl: "templates/home2.html",
          controller: 'HomeCtrl'
        }
      }
    })

  .state('app.activity', {
    url: "/activities/:activityId",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/startActivity.html",
        controller: 'ActivityCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
