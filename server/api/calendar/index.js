'use strict';

var express = require('express');
var controller = require('./calendar.controller');

var router = express.Router();

router.post('/initialize', controller.initialize);
router.get('/list', controller.calendars);
router.post('/events', controller.events);

module.exports = router;
