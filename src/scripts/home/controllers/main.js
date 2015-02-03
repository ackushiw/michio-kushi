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
    $scope.filterMenuPos = new Transitionable(0);
    $scope.optionsMenuSize = new Transitionable(0);
    $scope.flowerOpacity = new Transitionable(1);

    //famous Animations
    $scope.menuPos = $timeline([
      [0, [0, 0, 50], Easing.inOutQuad],
      [1, [0, 0, 101]]
    ]);
    $scope.menuSize = $timeline([
      [0, [0, 0], Easing.inOutQuad],
      [1, [200, 320]]
    ]);

    $scope.filterPos = $timeline([
      [0, [400, 0, 102], Easing.inOutQuad],
      [1, [0, 0, 102]]
    ]);
    $scope.filterSize = $timeline([
      [0, [0, 0], Easing.inOutQuad],
      [1, [300, undefined]]
    ]);

    vm.searchFocus = false;
    vm.optionsMenu = false;
    vm.filterMenu = false;
    vm.toggleSearch = function() {
      if(!vm.searchFocus) {
        vm.searchFocus = true;
        $scope.flowerOpacity = new Transitionable(0.3);

      } else {
        vm.searchFocus = false;
        $scope.flowerOpacity = new Transitionable(1);
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

    var activate = function() {

    };
    activate();

    // body...
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};