'use strict';
var controllername = 'main';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$scope'];

  function controller($scope) {
    var vm = this;

    vm.message = 'Hello World';
    var activate = function() {
      $scope.backgroundModel = {
        'background-color': 'red'
      };

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};