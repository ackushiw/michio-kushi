'use strict';
var controllername = 'sidenav';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$mdSidenav'];

  function controller($mdSidenav) {
    var vm = this;
    vm.message = 'Hello World';
    vm.close = function() {
      $mdSidenav('right').close()
        .then(function() {
          $log.debug("close RIGHT is done");
        });
    };
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};