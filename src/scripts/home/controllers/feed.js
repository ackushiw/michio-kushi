'use strict';
var controllername = 'feed';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = [app.name + '.feedFactory'];

  function controller(feedFactory) {
    var vm = this;
    var activate = function() {
      vm.data = feedFactory.data();
      console.log(vm.data);
      vm.feed = feedFactory.asArray();
      vm.deleteEntry = firedataDelete;

    };
    activate();

    function firedataDelete(key) {
      console.log('removing', key);
      feedFactory.arrayRemove(vm.feed, key);
    }
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};