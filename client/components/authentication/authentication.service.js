'use strict';

angular.module('ewsCalendarHourApp')
  .factory('Authentication', function ($http, $state, $window) {
    var auth = {
      credentials: {},
      error: ''
    };

    auth.login = function() {
      return $http.post('/api/calendar/login', {'Server': auth.credentials.server, 'Username': auth.credentials.username, 'Password': auth.credentials.password})
        .success(function(res) {
          console.log(res.token);
          auth.saveToken(res.token);
        })
        .error(function(error) {
          if (error === 'Unauthorized') {
            auth.error = 'Incorrect username or password';
          }
          else if (error === 'Not found') {
            auth.error = 'Incorrect server';
          }
          else if (error === 'No connection to EWS') {
            auth.error = 'Please connect to EWS before';
            $state.go('login');
          }
          else {
            auth.error = angular.copy(error.message);
          }
        });
    };

    auth.saveToken = function (token) {
      $window.localStorage['ews-token'] = token;
    };

    auth.getToken = function () {
      return $window.localStorage['ews-token'];
    };

    auth.logout = function() {
      $window.localStorage.removeItem('ews-token');
    };

    auth.isLoggedIn = function() {
      var token = auth.getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    return auth;
  });
