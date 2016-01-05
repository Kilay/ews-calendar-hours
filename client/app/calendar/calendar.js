'use strict';

angular.module('ewsCalendarHourApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('calendar', {
        url: '/',
        templateUrl: 'app/calendar/calendar.html',
        controller: 'CalendarCtrl',
        resolve: {
          events: function(Calendar, angularLoad, $window) {
            var lang = $window.navigator.language || $window.navigator.userLanguage;

            angularLoad.loadScript('../../bower_components/moment/locale/' + lang + '.js').then(function() {
              moment.locale(lang);
            }).catch(function() {
              angularLoad.loadScript('../../bower_components/moment/locale/' + lang.split('-')[0] + '.js').then(function() {
                moment.locale(lang);
              });
            });
            return Calendar.getCalendars();
          }
        }
      });
  });
