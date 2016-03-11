'use strict';

var express = require('express');
var jwt = require('express-jwt');
var config = require('../../config/local.env');
var controller = require('./calendar.controller');

var auth = jwt({
  secret: config.SESSION_SECRET,
  userProperty: 'payload'
});
var router = express.Router();

router.post('/login', controller.login);
router.get('/list', auth, controller.calendars);
router.post('/events', auth, controller.events);

module.exports = router;
