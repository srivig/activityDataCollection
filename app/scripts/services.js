angular.module('myDiaryApp.services', [])
  .factory('API', function($rootScope, $http, $ionicLoading, $window) {
    var base = "https://mydiaryalpha.herokuapp.com/";
    /*var base = "http://localhost:9804/";*/

    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        content: text ? text : 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        template:"<ion-spinner  class='spinner-light' icon='ripple'></ion-spinner>"
      });
    };
    $rootScope.hide = function() {
      $ionicLoading.hide();
    };
    $rootScope.authenticate = {
      /*if (!$rootScope.isSessionActive()) {
          $window.location.href = ('#/login');
      } */
    };
    $rootScope.logout = function() {
      $rootScope.setToken("");
      $window.location.href = '#/auth/login';
    };
    $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTimeout(function() {
        $rootScope.hide();
      }, 1999);
    };
    $rootScope.doRefresh = function(tab) {
      if (tab == 1)
        $rootScope.$broadcast('fetchAll');
      else
        $rootScope.$broadcast('fetchCompleted');
      $rootScope.$broadcast('scroll.refreshComplete');
    };
    $rootScope.setToken = function(token) {
      return $window.localStorage.token = token;
    }
    $rootScope.getToken = function() {
      return $window.localStorage.token;
    }
    $rootScope.isSessionActive = function() {
      return $window.localStorage.token ? true : false;
    }
    return {
      signin: function(form) {
        return $http.post(base + '/api/v1/mydiaryapp/auth/login', form);
      },
      signup: function(form) {
        return $http.post(base + '/api/v1/mydiaryapp/auth/register', form);
      },
      getAll: function(email,startDate) {
        return $http.get(base + '/api/v1/mydiaryapp/activityData/data/list', {
          method: 'GET',
          params: {
            token: email,
            startDate: startDate
          }
        });
      },
      getDates: function(email) {
        return $http.get(base + '/api/v1/mydiaryapp/activityData/data/datesWithData', {
          method: 'GET',
          params: {
            token: email
          }
        });
      },
      getExisting: function(email, id ) {
        return $http.get(base + '/api/v1/mydiaryapp/activityData/existing/' + id, {
          method: 'GET',
          params: {
            token: email
          }
        });
      },
      saveItem: function(form, email) {
        return $http.post(base + '/api/v1/mydiaryapp/activityData/data/item', form, {
          method: 'POST',
          params: {
            token: email
          }
        });
      },
      putItem: function(id, form, email) {
        return $http.put(base + '/api/v1/mydiaryapp/activityData/data/item/' + id, form, {
          method: 'PUT',
          params: {
            token: email
          }
        });
      },
      deleteItem: function(id, email) {
        return $http.delete(base + '/api/v1/mydiaryapp/activityData/data/item/' + id, {
          method: 'DELETE',
          params: {
            token: email
          }
        });
      }
    }
  });
