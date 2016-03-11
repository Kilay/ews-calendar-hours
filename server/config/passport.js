/**
 * Passport configuration
 */

'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var exchanger = require('exchanger');

module.exports = function(app) {
  app.use(passport.initialize());

  passport.use('local-login', new LocalStrategy({
      usernameField : 'Username',
      passwordField : 'Password',
      passReqToCallback : true
    },
    function(req, Username, Password, done) { // callback with email and password from our form
      exchanger.initialize({url: req.body.Server, username: req.body.Username, password: req.body.Password})
        .then(function(client) {
          exchanger.checkLogin(req.body.Username)
          .then(function(contacts) {
            return done(null, contacts[0]);
          })
          .fail(function(error) {
            if(error.code === 401) return done(null, false, 'Unauthorized');
            if(error.code === 404) return done(null, false, 'Not found');
            if(error.code === 'NOCLIENT') return done(null, false, 'No connection to EWS');
          });
        });
    }));
}


