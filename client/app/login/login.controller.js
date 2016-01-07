'use strict';

angular.module('ewsCalendarHourApp')
  .controller('LoginCtrl', function ($scope, $state, Calendar) {
    $scope.update = function() {
      Calendar.credentials = angular.copy($scope.credentials);
      Calendar.initialize().success(function() {
        $state.go('calendar');
      });
    };
  });
