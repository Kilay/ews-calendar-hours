'use strict';

var exchanger = require('exchanger');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../../config/local.env');

// Get list of calendars
exports.login = function(req, res) {
  passport.authenticate('local-login', function(err, user, info){
    var token;
    if (err) {
      res.status(404).json(err);
      return;
    }
    if(user){
      var expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);
      token = jwt.sign({
        email: user.email,
        name: user.name,
        exp: parseInt(expiry.getTime() / 1000),
      }, config.SESSION_SECRET);

      res.status(200).json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
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
    if(error.code === 'NOCLIENT') res.status(500).send('No connection to EWS');
  });
};
