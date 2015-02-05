'use strict';
require('angular-ui-router');
require('famous-angular');
require('ngMaterial');
require('ngAnimate');
require('angularfire');
require('ngTagEditor');
require('angular-youtube-embed');
require('angular-embedly');

var modulename = 'home';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['ui.router', 'famous.angular', 'ngMaterial', 'ngAnimate', 'firebase', 'ngTagEditor', 'youtube-embed', 'angular-embedly']);
  // inject:folders start
  require('./controllers')(app);
  require('./directives')(app);
  // inject:folders end

  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('home', {
        url: '/',
        template: require('./views/home.html'),
        controller: fullname + '.main',
        controllerAs: 'homeCtrl'
      });
    }
  ]);
  app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan')
      .accentPalette('green');
  }]);

  return app;
};