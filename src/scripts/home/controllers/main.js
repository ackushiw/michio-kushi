'use strict';
var controllername = 'main';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$famous', '$timeline', '$document'];

  function controller($scope, $famous, $timeline, $document) {
    var vm = this;
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];
    var Masonry = require('masonry-layout');

    vm.initMsnry = function() {
      console.log('init test');
      var container = document.querySelector('.msnry-test');
      console.log(container);
      vm.msnry = new Masonry(container, {
        columnWidth: '.item',
        itemSelector: '.item'
      });
    };

    //famous layout
    $scope.myGridLayoutOptions = {
      dimensions: [1, 9], // specifies number of columns and rows
    };
    //famous Inits
    $scope.optionsMenuPos = new Transitionable(0);
    $scope.filterMenuPos = new Transitionable(0);
    $scope.optionsMenuSize = new Transitionable(0);
    $scope.flowerOpacityVal = new Transitionable(1);
    $scope.flowerLogoSize = new Transitionable(1);
    $scope.flowerLogoPos = new Transitionable(1);

    //famous Animations
    //menu
    $scope.menuPos = $timeline([
      [0, [0, 0, 101], Easing.inOutQuad],
      [1, [0, 0, 1000]]
    ]);
    $scope.menuSize = $timeline([
      [0, [0, 0], Easing.inOutQuad],
      [1, [200, 320]]
    ]);
    //filters
    $scope.filterPos = $timeline([
      [0, [400, 0, 102], Easing.inOutQuad],
      [1, [0, 0, 102]]
    ]);
    $scope.filterSize = $timeline([
      [0, [0, 0], Easing.inOutQuad],
      [1, [300, undefined]]
    ]);
    //logo
    $scope.flowerSize = $timeline([
      [0, [48, 48], Easing.inOutQuad],
      [1, [100, 100]]
    ]);
    $scope.flowerPos = $timeline([
      [0, [-24, 8, 101], Easing.inOutQuad],
      [1, [16, 12, 101]]
    ]);
    $scope.flowerOpacity = $timeline([
      [0, 0.3, Easing.inOutQuad],
      [1, 1]
    ]);

    vm.searchFocus = false;
    vm.optionsMenu = false;
    vm.filterMenu = false;
    vm.toggleSearch = function() {
      if(!vm.searchFocus) {
        vm.searchFocus = true;
        $scope.flowerOpacityVal.set(0, {
          duration: 300
        });
        $scope.flowerLogoSize.set(0, {
          duration: 300
        });
        $scope.flowerLogoPos.set(0, {
          duration: 300
        });

      } else {
        vm.searchFocus = false;
        $scope.flowerOpacityVal.set(1, {
          duration: 300
        });
        $scope.flowerLogoSize.set(1, {
          duration: 300
        });
        $scope.flowerLogoPos.set(1, {
          duration: 300
        });
      }
    };
    vm.toggleFilters = function() {
      if(!vm.filterMenu) {
        vm.filterMenu = true;
        $scope.filterMenuPos.set(1, {
          duration: 300
        });

      } else {
        vm.filterMenu = false;
        $scope.filterMenuPos.set(0, {
          duration: 300
        });
      }
    };
    vm.toggleOptions = function() {
      if(!vm.optionsMenu) {
        vm.optionsMenu = true;
        $scope.optionsMenuPos.set(1, {
          duration: 300
        });
        $scope.optionsMenuSize.set(1, {
          duration: 300
        });
      } else {
        vm.optionsMenu = false;
        $scope.optionsMenuPos.set(0, {
          duration: 800
        });
        $scope.optionsMenuSize.set(0, {
          duration: 800
        });
      }
    };
    vm.filterMenuLayoutOptions = {
      direction: 1
    };

    //feed
    vm.feed = {
      "feed1": "feed43",
      "feed2": "feed",
      "feed3": "feed2343",
      "feed4": "feed23r443",
      "feed5": "feedsdfd43",
      "feed6": "feefsd43",
      "feed7": "fested43"
    };

    var activate = function() {

    };
    activate();

    // body...
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};