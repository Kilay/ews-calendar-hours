'use strict';

var exchanger = require('exchanger');
var config = require('../../config/local.env');

// Get list of calendars
exports.index = function(req, res) {
  res.json([]);
};

// Get list of calendars
exports.calendars = function(req, res) {
  console.log(config.DOMAIN);
  exchanger.initialize({url: config.ews.server, username: config.ews.user, password: config.ews.password}, function(err) {
    exchanger.getCalendars(function(err, calendars) {
      res.json(calendars);
    });
  });
};

// Get list of events
exports.events = function(req, res) {
  exchanger.initialize({url: config.ews.server, username: config.ews.user, password: config.ews.password}, function(err) {
    exchanger.getCalendarItems({id: req.body.CalendarId, changeKey: req.body.CalendarChangeKey}, req.body.StartDate, req.body.EndDate, function(err, events) {
      res.json(events);
    });
  });
};
