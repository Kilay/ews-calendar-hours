'use strict';

angular.module('ewsCalendarHourApp')
  .controller('LoginCtrl', function ($scope, $state, Authentication) {
    $scope.error = Authentication.error;
    $scope.update = function() {
      Authentication.credentials = angular.copy($scope.credentials);
      if (Authentication.credentials !== undefined && (Authentication.credentials.server !== undefined && Authentication.credentials.username !== undefined && Authentication.credentials.password !== undefined)) {
        Authentication.login().success(function () {
          $state.go('calendar');
        })
        .error(function () {
          $scope.error = Authentication.error;
        });
      }
      else {
        $scope.error = 'Enter credentials information';
      }
    };
  });
