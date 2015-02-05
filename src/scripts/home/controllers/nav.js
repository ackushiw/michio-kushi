'use strict';
var controllername = 'nav';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$log', '$mdSidenav', '$state'];

  function controller($log, $mdSidenav, $state) {
    var vm = this;
    vm.message = 'Hello World';
    vm.test = function() {
      console.log('test');
      $state.go('home.feed');
    };

    vm.toggleRight = function() {
      $mdSidenav('right').toggle()
        .then(function() {
          $log.debug("toggle RIGHT is done");
        });
    };
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};