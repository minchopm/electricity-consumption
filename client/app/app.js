'use strict';

angular.module('electricityConsumptionApp', ['electricityConsumptionApp.constants', 'ngCookies',
  'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
  'validation.match',
  'ngAnimate', 'ngMessages', 'ngMaterial', 'chart.js'
])
  .config(function ($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
