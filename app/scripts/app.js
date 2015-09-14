
var myDiaryApp = angular.module('myDiaryApp', ['ionic', 'myDiaryApp.controllers', 'myDiaryApp.services', 'chart.js'])

.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
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

  .state('auth', {
    url: "/auth",
    abstract: true,
    templateUrl: "templates/auth.html"
  })

  .state('auth.login', {
    url: '/login',
    cache: false,
    views: {
      'login': {
        templateUrl: 'templates/login.html',
        controller: 'SignInCtrl'
      }
    }
  })

  .state('auth.signup', {
      url: '/signup',
      cache: false,
      views:{
        'signup': {
          templateUrl: 'templates/signup.html',
          controller: 'SignUpCtrl'
        }
      }
    })

  .state('app.activities', {
    url: "/activities/:date",
    views: {
      'menuContent': {
        templateUrl: "templates/activities.html",
        controller: 'ActivitiesCtrl'
      }
    }
  })

  .state('app.home', {
    url: "/home",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.chart', {
    url: "/chart",
    views: {
      'menuContent': {
        templateUrl: "templates/chart.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.activity', {
    url: "/activities/:activityId/:date",
    cache: false,
    views: {
      'menuContent': {
        templateUrl: "templates/startActivity.html",
        controller: 'ActivityCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/login');
});


myDiaryApp.config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $ionicConfigProvider.spinner.icon('ripple');

}]);
