'use strict';

angular.module('ewsCalendarHourApp', [
  'ui.router',
  'ui.bootstrap',
  'angularMoment',
  'blockUI',
  'daterangepicker'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(function(blockUIConfig) {
    blockUIConfig.delay = 100;
  });
