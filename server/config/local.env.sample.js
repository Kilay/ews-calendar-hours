'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

var config = {};
config.ews = {};

config.DOMAIN = '';
config.SESSION_SECRET = "";
// Control debug level for modules using visionmedia/debug
config.DEBUG = '';
config.GA = 'UA-XXXXX-X';

module.exports = config;
