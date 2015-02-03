'use strict';
var controllername = 'main';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope', '$famous', '$timeline'];

  function controller($scope, $famous, $timeline) {
    var vm = this;
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Easing = $famous['famous/transitions/Easing'];

    //famous layout
    $scope.myGridLayoutOptions = {
      dimensions: [1, 9], // specifies number of columns and rows
    };
    //famous Inits
    $scope.optionsMenuPos = new Transitionable(0);
    //$scope.test = new Transitionable(0);
    $scope.optionsMenuSize = new Transitionable(0);
    $scope.flowerOpacity = new Transitionable(1);

    //famous Animations
    $scope.menuPos = $timeline([
      [0, [0, 0, 0], Easing.inOutQuad],
      [1, [0, 0, 101]]
    ]);
    $scope.menuSize = $timeline([
      [0, [0, 0], Easing.inOutQuad],
      [1, [320, 320]]
    ]);

    vm.searchFocus = false;
    vm.optionsMenu = false;
    vm.toggleSearch = function() {
      if(!vm.searchFocus) {
        vm.searchFocus = true;
        $scope.flowerOpacity = new Transitionable(0.3);

      } else {
        vm.searchFocus = false;
        $scope.flowerOpacity = new Transitionable(1);
      }
    };
    vm.toggleOptions = function() {
      if(!vm.optionsMenu) {
        vm.optionsMenu = true;
        $scope.optionsMenuPos.set(1, {
          duration: 800
        });
        $scope.optionsMenuSize.set(1, {
          duration: 800
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
    vm.sideNavOptions = {
      dimentions: [1, 5]
    };

    var activate = function() {

    };
    activate();

    // body...
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};