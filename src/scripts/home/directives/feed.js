'use strict';
/*eslint consistent-this:[2,  "feed"] */
var directivename = 'feed';

module.exports = function(app) {

  // controller
  var controllerDeps = ['$firebase', '$window'];
  var controller = function($firebase, $window) {
    var vm = this;
    //Firebase URL
    vm.FBURL = 'https://fabula.firebaseio.com/public/michiokushi';
    var fireRef = new Firebase(vm.FBURL);

    vm.sync = $firebase(fireRef);

    //Masonry
    var container = document.querySelector('.masonry-container');
    var Masonry = require('masonry-layout');
    vm.initMsnry = function() {
      console.log('init');
      var container = document.querySelector('.masonry-container');
      console.log(container);
      vm.msnry = new Masonry(container, {
        //columnWidth: '.tile-size',
        itemSelector: '.item',
        gutter: 0
      });
      vm.msnry.layout();
    }
    vm.layout = function() {
      console.log('layout updated');
      vm.msnry.layout();
    };
    //Firebase

    vm.feed = {
      "firstName": "John",
      "lastName": "Doe",
      "Name": "John",
      "last": "Doe"
    };
  };
  controller.$inject = controllerDeps;

  // directive
  var directiveDeps = [];
  var directive = function() {
    return {
      restrict: 'AE',
      scope: {
        title: '@' // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
      },
      controller: controller,
      controllerAs: 'feedCtrl',
      bindToController: true,
      template: require('./feed.html'),
      link: function(scope, element, attrs) {
        var getElement = element[0].getElementsByClassName('masonry-container');
        console.log(getElement);
        var msnryElement = getElement[0];
        console.log(msnryElement);
        scope.name = 'test';
        scope.msnryElement = msnryElement;
        var Masonry = require('masonry-layout');

        var msnry = new Masonry(msnryElement, {
          columnWidth: 200,
          itemSelector: '.item'
        });

      }
    };
  };
  directive.$inject = directiveDeps;

  app.directive(directivename, directive);
};
//package.json old entries
// "imagesloaded": "./bower_components/imagesloaded/imagesloaded.pkgd.min.js",
// "eventEmitter": "./bower_components/eventEmitter/EventEmitter.min.js",
// "eventie": "./bower_components/eventie/eventie.js",
// "desandro-get-style-property": "./bower_components/get-style-property/get-style-property.js",
// "get-size": "./bower_components/get-size/get-size.js",
// "doc-ready": "./bower_components/doc-ready/doc-ready.js",
// "matches-selector": "./bower_components/matches-selector/matches-selector.js",
// "outlayer": "./bower_components/outlayer/outlayer.js",
// "masonryjs": "./bower_components/masonry/dist/masonry.pkgd.min.js",
// "ngMasonry": "./bower_components/angular-masonry-directive/src/angular-masonry-directive.js",
// "masonry": "./node_modules/masonry-layout/dist/masonry.pkgd.min.js"

//
// ,
// "doc-ready": {
//   "depends": [
//   "eventie"
//   ]
// },
// "get-size": {
//   "depends": [
//   "desandro-get-style-property"
//   ]
// },
// "outlayer": {
//   "depends": [
//   "doc-ready",
//   "eventEmitter",
//   "eventie",
//   "get-size",
//   "desandro-get-style-property",
//   "matches-selector"
//   ]
// },
// "masonryjs": {
//   "depends": [
//   "get-size",
//   "outlayer"
//   ]
// },
// "imagesloaded": {
//   "depends": [
//   "eventEmitter",
//   "eventie"
//   ]
// },
// "ngMasonry": {
//   "exports": "ngMasonry",
//   "depends": [
//   "angular",
//   "masonryjs",
//   "imagesloaded"
//
//   ]
// }