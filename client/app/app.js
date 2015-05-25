'use strict';

angular.module('parserApp', [
  'parserApp.headerService',
  'parserApp.twitterService',
  'parserApp.display3dService',
  'parserApp.authService',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      // .state('main.frontpage3d', {
      //   templateUrl: 'app/main/main.frontpage3d.html',
      //   controller: '3dStreamCtrl'
      // })
      .state('main.components', {
        views: {
          'frontpage3d': {
            templateUrl: 'app/main/main.frontpage3d.html',
            controller: '3dStreamCtrl'
          },
          'tweets-sentiment-display': {
            templateUrl: 'app/main/main.tweets-sentiment-display.html'
          }
        }
      })
      .state('3dstream', {
        url: '/3dstream',
        templateUrl: 'app/3dstream/3dstream.html',
        controller: '3dStreamCtrl'
      })
      .state('dbPanel', {
        url: '/dbPanel',
        templateUrl: 'app/dbPanel/dbPanel.html',
        controller: 'DBPanelCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('adminlogin', {
        url: '/adminlogin',
        templateUrl: 'app/adminlogin/adminlogin.html',
        controller: 'AdminLoginCtrl'
      });

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });