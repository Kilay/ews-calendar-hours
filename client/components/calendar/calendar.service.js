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
        end: ''
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
          event.durationAsHours = moment.duration(event.duration).asHours();
          basedDuration.add(moment.duration(event.duration));
        });
        angular.copy(events, data.events);
        data.cumulatedDuration = angular.copy(basedDuration.asHours());
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
      
      if(data.range !== "custom") {
        d1 = currentDatePointer.clone();
        d2 = currentDatePointer.clone().add(1, data.range).subtract(1, "seconds");
      }
      else {
        //d1 = currentDatePointer.clone();
        //d2 = currentDatePointerEnd.clone();
      }
      
      data.start = d1;
      data.end = d2;
    }
    
    data.reset = function() {
      data.cumulatedDuration = 0;
      data.calendar = '';
      data.events = [];
    }
    
    return data;
  });
