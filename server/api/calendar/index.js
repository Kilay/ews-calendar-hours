'use strict';

var express = require('express');
var controller = require('./calendar.controller');

var router = express.Router();

router.post('/login', controller.login);
router.get('/list', controller.calendars);
router.post('/events', controller.events);

module.exports = router;
