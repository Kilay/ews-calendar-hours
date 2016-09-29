'use strict';

angular.module('ewsCalendarHourApp')
  .controller('LoginCtrl', function ($scope, $state, Calendar) {
    $scope.error = Calendar.error;
    $scope.update = function() {
      Calendar.credentials = angular.copy($scope.credentials);
      if (Calendar.credentials !== undefined && (Calendar.credentials.server !== undefined && Calendar.credentials.username !== undefined && Calendar.credentials.password !== undefined && Calendar.credentials.security !== undefined)) {
        Calendar.login().success(function () {
          $state.go('calendar');
        })
        .error(function () {
          $scope.error = Calendar.error;
        });
      }
      else {
        $scope.error = 'Enter credentials information';
      }
    };
  });
