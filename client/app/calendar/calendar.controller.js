'use strict';

angular.module('ewsCalendarHourApp')
  .controller('CalendarCtrl', function ($scope, Calendar) {
    $scope.calendars = Calendar.calendars;
    $scope.range = Calendar.range;
    $scope.controls = true;
    $scope.group = false;
    $scope.datesRange = {startDate: null, endDate: null};
    $scope.singleDate = moment();

    $scope.update = function(offset) {
      Calendar.calendar = $scope.calendar;
      Calendar.range = $scope.range;

      Calendar.updateRange(offset);
      if(Calendar.calendar !== undefined && Calendar.calendar !== '') {
        Calendar.getEvents().success(function() {
          $scope.cumulatedDuration = Calendar.cumulatedDuration;
          $scope.readableDate = Calendar.readableDate;
          $scope.singleDate = Calendar.start;
          $scope.datesRange = {
            startDate: Calendar.start,
            endDate: Calendar.end
          };
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
      if (newDate.startDate !== Calendar.start || newDate.endDate !== Calendar.end) {
        Calendar.start = newDate.startDate;
        Calendar.end = newDate.endDate;
        $scope.update();
      }
    }, false);

    $scope.$watch('singleDate', function(newDate) {
      if (newDate !== Calendar.start) {
        Calendar.start = newDate;
        $scope.update(newDate);
      }
    }, false);
  });
