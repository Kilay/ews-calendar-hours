'use strict';

angular.module('ewsCalendarHourApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('calendar', {
        url: '/calendar',
        templateUrl: 'app/calendar/calendar.html',
        controller: 'CalendarCtrl',
        resolve: {
          events: function(Calendar, $ocLazyLoad, $window) {
            var lang = $window.navigator.language || $window.navigator.userLanguage;
            $ocLazyLoad.load('../../bower_components/moment/locale/' + lang.toLowerCase() + '.js')
              .catch(function (err) {
                $ocLazyLoad.load('../../bower_components/moment/locale/' + lang.split('-')[0].toLowerCase() + '.js');
            });
            return Calendar.getCalendars();
          }
        }
      });
  });
