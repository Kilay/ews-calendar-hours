'use strict';

angular.module('ewsCalendarHourApp')
  .factory('Calendar', function ($http, $state, Authentication) {
    var data = {
      credentials: {},
      calendar: '',
      calendars: [],
      events: [],
      groupedEvents: {},
      cumulatedDuration: 0,
      range: 'week',
      start: '',
      end: '',
      readableDate: '',
      error: ''
    };

    data.getCalendars = function() {
      return $http.get('/api/calendar/list', {
        headers: {
          Authorization: 'Bearer '+ Authentication.getToken()
        }
      })
      .success(function(calendars) {
        angular.copy(calendars, data.calendars);
      })
      .error(function(error) {
        if (error === 'Unauthorized') {
          data.error = 'Incorrect username or password';
        }
        else if (error === 'Not found') {
          data.error = 'Incorrect server';
        }
        else if (error === 'No connection to EWS') {
          data.error = 'Please connect to EWS before';
          Authentication.logout();
          $state.go('login');
        }
        else {
          data.error = angular.copy(error);
        }
      });
    };

    data.getEvents = function() {
      return $http.post('/api/calendar/events/', {
        'CalendarId': data.calendar,
        'StartDate': data.start.format(),
        'EndDate': data.end.format()
        }, {
        headers: {
          Authorization: 'Bearer '+ Authentication.getToken()
        }
      })
      .success(function(events) {
        var basedDuration = moment.duration();
        var a = {};
        angular.forEach(events, function(event, key) { // jshint ignore:line
          event.tooltip = moment(event.start).format("LL") + ' from ' + moment(event.start).format("LT") + ' to ' + moment(event.end).format("LT") + ' by ' + event.organizer;
          event.durationAsHours = Math.round(moment.duration(event.duration).asHours() * 100) / 100;
          if(event.subject in a) {
            a[event.subject].duration = a[event.subject].duration.add(moment.duration(event.duration));
            a[event.subject].events.push(event);
          }
          else {
            a[event.subject] = {'duration': moment.duration(event.duration), events: [event]};
          }
          a[event.subject].durationAsHours = Math.round(moment.duration(a[event.subject].duration).asHours() * 100) / 100;
          basedDuration.add(moment.duration(event.duration));
        });
        angular.copy(events, data.events);
        angular.copy(a, data.groupedEvents);
        data.cumulatedDuration = angular.copy(Math.round(basedDuration.asHours() * 100) / 100);
      })
      .error(function(error) {
        if (error === 'Unauthorized') {
          data.error = 'Incorrect username or password';
        }
        else if (error === 'Not found') {
          data.error = 'Incorrect server';
        }
        else if (error === 'No connection to EWS') {
          data.error = 'Please connect to EWS before';
          Authentication.logout();
          $state.go('login');
        }
        else {
          data.error = angular.copy(error);
        }
      });
    };

    data.updateRange = function(offset) {
      var currentDatePointer;

      if(offset === undefined) {
        if (data.range === 'week') {
          currentDatePointer = moment().startOf('isoWeek');
        }
        else {
          currentDatePointer = moment().startOf(data.range);
        }
      }
      else if(moment.isMoment(offset)) {
        currentDatePointer = offset;
      }
      else {
        currentDatePointer = data.start.add(offset, data.range);
      }

      if(data.range === 'day') {
        data.start = currentDatePointer.clone();
        data.end = currentDatePointer.clone().add(1, data.range).subtract(1, 'seconds');
        data.readableDate = data.start.format('dddd, LL');
      }
      else if(data.range === 'week') {
        data.start = currentDatePointer.clone();
        data.end = currentDatePointer.clone().add(1, data.range).subtract(1, 'seconds');
        data.readableDate = data.start.format('L') + ' - ' + data.end.format('L');
      }
      else if(data.range === 'month') {
        data.start = currentDatePointer.clone();
        data.end = currentDatePointer.clone().add(1, data.range).subtract(1, 'seconds');
        data.readableDate = data.start.format('MMMM YYYY');
      }
      else if(data.range === 'year') {
        data.start = currentDatePointer.clone();
        data.end = currentDatePointer.clone().add(1, data.range).subtract(1, 'seconds');
        data.readableDate = data.end.format('YYYY');
      }
      else if(data.range === 'custom') {
        data.readableDate = '';
      }
    };

    data.reset = function() {
      data.cumulatedDuration = 0;
      data.calendar = '';
      data.events = [];
    };

    return data;
  });
