'use strict';

angular.module('ewsCalendarHourApp')
  .controller('CalendarCtrl', function ($scope, Calendar) {
    $scope.calendars = Calendar.calendars;
    $scope.range = Calendar.range;
    $scope.controls = 1;
    $scope.datesRange = {startDate: null, endDate: null};

    $scope.update = function() {
      Calendar.calendar = angular.copy($scope.calendar);
      Calendar.range = angular.copy($scope.range);

      Calendar.updateRange();
      if(Calendar.calendar !== undefined && Calendar.calendar !== "") {
        Calendar.getEvents().success(function() {
          $scope.cumulatedDuration = angular.copy(Calendar.cumulatedDuration);
          $scope.readableDate = angular.copy(Calendar.readableDate);
          $scope.controls = 0;
        });
      }
      else {
        Calendar.reset();
        $scope.cumulatedDuration = angular.copy(Calendar.cumulatedDuration);
        $scope.events = Calendar.events;
        $scope.controls = 1;
      }
    };

    $scope.previous = function() {
      Calendar.calendar = angular.copy($scope.calendar);
      Calendar.range = angular.copy($scope.range);

      Calendar.updateRange(-1);
      if(Calendar.calendar !== undefined && Calendar.calendar !== "") {
        Calendar.getEvents().success(function() {
          $scope.cumulatedDuration = angular.copy(Calendar.cumulatedDuration);
          $scope.readableDate = angular.copy(Calendar.readableDate);
          $scope.controls = 0;
        });
      }
      else {
        Calendar.reset();
        $scope.cumulatedDuration = angular.copy(Calendar.cumulatedDuration);
        $scope.events = Calendar.events;
        $scope.controls = 1;
      }
    };

    $scope.next = function() {
      Calendar.calendar = angular.copy($scope.calendar);
      Calendar.range = angular.copy($scope.range);

      Calendar.updateRange(1);
      if(Calendar.calendar !== undefined && Calendar.calendar !== "") {
        Calendar.getEvents().success(function() {
          $scope.cumulatedDuration = angular.copy(Calendar.cumulatedDuration);
          $scope.readableDate = angular.copy(Calendar.readableDate);
          $scope.controls = 0;
        });
      }
      else {
        Calendar.reset();
        $scope.cumulatedDuration = angular.copy(Calendar.cumulatedDuration);
        $scope.events = Calendar.events;
        $scope.controls = 1;
      }
    };

    $scope.$watch('datesRange', function(newDate) {
      Calendar.start = newDate.startDate;
      Calendar.end = newDate.endDate;
      $scope.update();
    }, false);
  });
