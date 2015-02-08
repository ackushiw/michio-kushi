'use strict';
require('angular-ui-router');
require('ngMaterial');
require('angularfire');

var modulename = 'home';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['ui.router', 'ngMaterial', 'firebase']);
  // inject:folders start
  require('./controllers')(app);
  require('./services')(app);
  // inject:folders end

  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/memories');
      $stateProvider.state('home', {
        url: '/',
        template: require('./views/home.html'),
        controller: fullname + '.main',
        controllerAs: 'homeCtrl'
      }).state('home.feed', {
        url: 'memories',
        template: require('./views/feed.html')
      }).state('home.create', {
        url: 'create',
        template: require('./views/create.html'),
        controller: fullname + '.feed',
        controllerAs: 'createCtrl'
      });
    }
  ]);
  app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan')
      .accentPalette('orange');
  }]);

  return app;
};