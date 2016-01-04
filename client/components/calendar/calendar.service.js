'use strict';

angular.module('ewsCalendarHourApp')
  .factory('Calendar', function ($http, moment) {
    var data = {
      calendar: '',
      calendars: [],
      events: [],
      cumulatedDuration: 0,
      range: 'week',
      start: '',
      end: '',
      readableDate: ''
    };

    data.getCalendars = function() {
      return $http.get('/api/calendar/list').success(function(calendars) {
        angular.copy(calendars, data.calendars);
      });
    };

    data.getEvents = function() {
      return $http.post('/api/calendar/events/', {'CalendarId': data.calendar, 'StartDate': data.start.format(), 'EndDate': data.end.format()}).success(function(events) {
        var basedDuration = moment.duration();
        angular.forEach(events, function(event, key) {
          event.durationAsHours = Math.round(moment.duration(event.duration).asHours() * 100) / 100;
          basedDuration.add(moment.duration(event.duration));
        });
        angular.copy(events, data.events);
        data.cumulatedDuration = angular.copy(Math.round(basedDuration.asHours() * 100) / 100);
      });
    };

    data.updateRange = function(offset) {
      var currentDatePointer, d1, d2;
      if(offset === undefined) {
        if(data.range === "week")
          currentDatePointer = moment().startOf("isoWeek");
        else
          currentDatePointer = moment().startOf(data.range);
      }
      else {
        currentDatePointer = data.start.add(offset, data.range);
      }

      if(data.range === "day") {
        data.start = currentDatePointer.clone();
        data.end = currentDatePointer.clone().add(1, data.range).subtract(1, "seconds");
        data.readableDate = data.start.format('dddd, LL');
      }
      else if(data.range === "week") {
        data.start = currentDatePointer.clone();
        data.end = currentDatePointer.clone().add(1, data.range).subtract(1, "seconds");
        data.readableDate = data.start.format("L") + ' - ' + data.end.format("L");
      }
      else if(data.range === "month") {
        data.start = currentDatePointer.clone();
        data.end = currentDatePointer.clone().add(1, data.range).subtract(1, "seconds");
        data.readableDate = data.start.format("MMMM YYYY");
      }
      else if(data.range === "year") {
        data.start = currentDatePointer.clone();
        data.end = currentDatePointer.clone().add(1, data.range).subtract(1, "seconds");
        data.readableDate = data.end.format("YYYY");
      }
    }

    data.reset = function() {
      data.cumulatedDuration = 0;
      data.calendar = '';
      data.events = [];
    }

    return data;
  });
