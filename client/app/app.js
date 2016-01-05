'use strict';

angular.module('ewsCalendarHourApp', [
  'ui.router',
  'ui.bootstrap',
  'blockUI',
  'daterangepicker',
  'oc.lazyLoad'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  })
  .config(function(blockUIConfig) {
    blockUIConfig.delay = 100;
  });
