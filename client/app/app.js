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
})
.run(function($rootScope, $state, Authentication) {
  $rootScope.$on('$locationChangeSuccess', function() {
    console.log($state.current);
    console.log($state.is('calendar'));
    console.log(Authentication.isLoggedIn());
    if($state.current.name !== 'login' && !Authentication.isLoggedIn()) {
      Authentication.error = 'Please connect to EWS before';
      $state.go('login');
    }
  })
});
