'use strict';

angular.module('ewsCalendarHourApp')
  .controller('CalendarCtrl', function ($scope, Calendar) {
    $scope.calendars = Calendar.calendars;
    $scope.events = Calendar.events;
    $scope.cumulatedDuration = Calendar.cumulatedDuration;
    $scope.range = Calendar.range;
    $scope.controls = 1;
    $scope.start = moment().startOf("isoWeek").format("L");
    $scope.end = moment().startOf("isoWeek").add(1, "week").subtract(1, "seconds").format("L");
    
    $scope.update = function() {
      Calendar.calendar = angular.copy($scope.calendar);
      Calendar.range = angular.copy($scope.range);
      
      Calendar.updateRange();
      if(Calendar.calendar !== undefined && Calendar.calendar !== "") {
        Calendar.getEvents().success(function() {
          $scope.cumulatedDuration = angular.copy(Calendar.cumulatedDuration);
          $scope.start = angular.copy(Calendar.start.format("L"));
          $scope.end = angular.copy(Calendar.end.format("L"));
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
          $scope.start = angular.copy(Calendar.start.format("L"));
          $scope.end = angular.copy(Calendar.end.format("L"));
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
          $scope.start = angular.copy(Calendar.start.format("L"));
          $scope.end = angular.copy(Calendar.end.format("L"));
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
  });
