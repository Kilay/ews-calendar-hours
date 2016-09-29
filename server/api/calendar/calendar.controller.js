'use strict';

var exchanger = require('exchanger');
var config = require('../../config/local.env');

// Get list of calendars
exports.login = function(req, res) {
  exchanger.initialize({url: req.body.Server, username: req.body.Username, password: req.body.Password, security: req.body.Security})
  .then(function(client) {
    exchanger.checkLogin(req.body.Username)
    .then(function(contacts) {
      res.end();
    })
    .fail(function(error) {
      if(error.code === 401) res.status(401).send('Unauthorized');
      if(error.code === 404) res.status(404).send('Not found');
      if(error.code === 'NONTLM') res.status(500).send('EWS respond without NTLM message. Please use basic authentication.');
      if(error.code === 'NOCLIENT') res.status(500).send('No connection to EWS');
    });
  });
};

// Get list of calendars
exports.calendars = function(req, res) {
  exchanger.getCalendars()
  .then(function(calendars) {
    res.json(calendars);
  })
  .fail(function(error) {
    if(error.code === 401) res.status(401).send('Unauthorized');
    if(error.code === 404) res.status(404).send('Not found');
    if(error.code === 'NONTLM') res.status(500).send('EWS respond without NTLM message. Please use basic authentication');
    if(error.code === 'NOCLIENT') res.status(500).send('No connection to EWS');
  });
};

// Get list of events
exports.events = function(req, res) {
  exchanger.getCalendarItems({id: req.body.CalendarId, changeKey: req.body.CalendarChangeKey}, req.body.StartDate, req.body.EndDate)
  .then(function(calendars) {
    res.json(calendars);
  })
  .fail(function(error) {
    if(error.code === 401) res.status(401).send('Unauthorized');
    if(error.code === 404) res.status(404).send('Not found');
    if(error.code === 'NONTLM') res.status(500).send('EWS respond without NTLM message. Please use basic authentication');
    if(error.code === 'NOCLIENT') res.status(500).send('No connection to EWS');
  });
};
