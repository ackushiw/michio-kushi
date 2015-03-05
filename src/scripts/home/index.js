'use strict';
require('angular-ui-router');
require('angular-sanitize');
require('ngMaterial');
require('angularfire');
require('angular-youtube-mb');
require('angular-embedly');
require('ngImgur');
require('ngMaps');
require('ngBootstrap');

var modulename = 'home';

module.exports = function(namespace) {

  var fullname = namespace + '.' + modulename;

  var angular = require('angular');
  var app = angular.module(fullname, ['ui.router', 'ngSanitize', 'ngMaterial', 'firebase', 'youtube-embed', 'angular-embedly', 'ngImgur', 'uiGmapgoogle-maps', 'ui.bootstrap']);
  // inject:folders start
  require('./controllers')(app);
  require('./directives')(app);
  require('./services')(app);
  // inject:folders end

  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider.state('home', {
          url: '/',
          template: require('./views/welcome.html')
        }).state('home.donate', {
          url: 'donate',
          template: require('./views/donate.html')
        })
        .state('home.test', {
          url: '/welcome',
          template: require('./views/home.html'),
          controller: fullname + '.main',
          controllerAs: 'homeCtrl'
        }).state('home.feed', {
          url: 'memories',
          template: require('./views/feed.html')
        }).state('home.macro', {
          url: 'test',
          template: require('./views/feedtest.html')
        }).state('home.login', {
          url: 'login',
          template: require('./views/login.html'),
          controller: fullname + '.login',
          controllerAs: 'loginCtrl'
        }).state('home.create', {
          url: 'create',
          template: require('./views/create.html'),
          controller: fullname + '.post',
          controllerAs: 'createCtrl',
          resolve: {
            currentAuth: ['$rootScope', '$firebaseAuth', '$state', function($rootScope, $firebaseAuth, $state) {
              var auth = $rootScope.authObj.$requireAuth()
              auth.then(function(result) {
                console.log(result);
              }).catch(function(error) {
                console.log(error);
                $state.go('home.login');
              });
              console.log(auth);
              return auth;
            }]
          }
        }).state('home.create.story', {
          url: '/story',
          template: require('./views/create/story.html'),
          controller: fullname + '.post',
          controllerAs: 'createCtrl'
        }).state('home.create.image', {
          url: '/image',
          template: require('./views/create/image.html'),
          controller: fullname + '.post',
          controllerAs: 'createCtrl'
        })
        .state('home.create.video', {
          url: '/video',
          template: require('./views/create/video.html'),
          controller: fullname + '.post',
          controllerAs: 'createCtrl'
        })
        .state('home.create.article', {
          url: '/article',
          template: require('./views/create/article.html'),
          controller: fullname + '.post',
          controllerAs: 'createCtrl'
        })
        .state('home.create.recipe', {
          url: '/recipe',
          template: require('./views/create/recipe.html'),
          controller: fullname + '.post',
          controllerAs: 'createCtrl'
        });
    }
  ]);
  app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('cyan')
      .accentPalette('orange');
  }]);
  app.config(['embedlyServiceProvider', function(embedlyServiceProvider) {
    embedlyServiceProvider.setKey('8d5fa3afe41a41d392b52af11adafbac');
  }]);
  app.config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyC_dHAWi6wu6EBXtHvJjpjQxK89PXtDwQA',
      v: '3.17',
      libraries: 'geometry,visualization,places'
    });
  }]);
  app.run(['$rootScope', '$firebaseAuth', function($rootScope, $firebaseAuth) {
    var ref = new Firebase('https://fabula.firebaseio.com');
    $rootScope.authObj = $firebaseAuth(ref);
  }]);

  return app;
};