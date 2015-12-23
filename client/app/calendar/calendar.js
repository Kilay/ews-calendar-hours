'use strict';

angular.module('ewsCalendarHourApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('calendar', {
        url: '/',
        templateUrl: 'app/calendar/calendar.html',
        controller: 'CalendarCtrl',
        resolve: {
          events: function(Calendar) {
            console.log()
            return Calendar.getCalendars();
          }
        }
      });
  });