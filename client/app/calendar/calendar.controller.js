'use strict';

angular.module('ewsCalendarHourApp')
  .controller('CalendarCtrl', function ($scope, Calendar) {
    $scope.calendars = Calendar.calendars;
    $scope.range = Calendar.range;
    $scope.controls = true;
    $scope.group = false;
    $scope.datesRange = {startDate: null, endDate: null};



    $scope.update = function() {
      Calendar.calendar = $scope.calendar;
      Calendar.range = $scope.range;

      Calendar.updateRange();
      if(Calendar.calendar !== undefined && Calendar.calendar !== "") {
        Calendar.getEvents().success(function() {
          $scope.cumulatedDuration = Calendar.cumulatedDuration;
          $scope.readableDate = Calendar.readableDate;
          $scope.controls = false;
        });
      }
      else {
        Calendar.reset();
        $scope.cumulatedDuration = Calendar.cumulatedDuration;
        $scope.events = Calendar.events;
        $scope.groupedEvents = Calendar.groupedEvents;
        $scope.controls = true;
      }
    };

    $scope.previous = function() {
      Calendar.calendar = $scope.calendar;
      Calendar.range = $scope.range;

      Calendar.updateRange(-1);
      if(Calendar.calendar !== undefined && Calendar.calendar !== "") {
        Calendar.getEvents().success(function() {
          $scope.cumulatedDuration = Calendar.cumulatedDuration;
          $scope.readableDate = Calendar.readableDate;
          $scope.controls = false;
        });
      }
      else {
        Calendar.reset();
        $scope.cumulatedDuration = Calendar.cumulatedDuration;
        $scope.events = Calendar.events;
        $scope.groupedEvents = Calendar.groupedEvents;
        $scope.controls = true;
      }
    };

    $scope.next = function() {
      Calendar.calendar = $scope.calendar;
      Calendar.range = $scope.range;

      Calendar.updateRange(1);
      if(Calendar.calendar !== undefined && Calendar.calendar !== "") {
        Calendar.getEvents().success(function() {
          $scope.cumulatedDuration = Calendar.cumulatedDuration;
          $scope.readableDate = Calendar.readableDate;
          $scope.controls = false;
        });
      }
      else {
        Calendar.reset();
        $scope.cumulatedDuration = Calendar.cumulatedDuration;
        $scope.events = Calendar.events;
        $scope.groupedEvents = Calendar.groupedEvents;
        $scope.controls = true;
      }
    };

    $scope.$watch('datesRange', function(newDate) {
      Calendar.start = newDate.startDate;
      Calendar.end = newDate.endDate;
      $scope.update();
    }, false);
  });
