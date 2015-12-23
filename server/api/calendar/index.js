'use strict';

var express = require('express');
var controller = require('./calendar.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/list', controller.calendars);
router.post('/events', controller.events);

module.exports = router;