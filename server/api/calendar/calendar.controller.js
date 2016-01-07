'use strict';

var exchanger = require('exchanger');
var config = require('../../config/local.env');

// Get list of calendars
exports.initialize = function(req, res) {
  exchanger.initialize({url: req.body.Server, username: req.body.Username, password: req.body.Password}, function(err) {
    res.json(err);
  });
};

// Get list of calendars
exports.calendars = function(req, res) {
  exchanger.getCalendars(function(err, calendars) {
    console.log('eeeee');
    if(err) {
      console.log(err);
      if(err.code === 'ENOTFOUND')
        res.status(404).send('Incorrect server.');
      else if(err.response.statusCode === 401)
        res.status(401).send({ error: 'Incorrect username or password.' });
    }
    else {
      res.json(calendars);
    }
  });
};

// Get list of events
exports.events = function(req, res) {
  exchanger.getCalendarItems({id: req.body.CalendarId, changeKey: req.body.CalendarChangeKey}, req.body.StartDate, req.body.EndDate, function(err, events) {
    if(err) {
      console.log(err);
      if(err.code === 'ENOTFOUND')
        res.status(404).send({ error: 'Incorrect server.' });
      else if(err.response.statusCode === 401)
        res.status(401).send({ error: 'Incorrect username or password.' });
    }
    else {
      res.json(events);
    }
  });
};
