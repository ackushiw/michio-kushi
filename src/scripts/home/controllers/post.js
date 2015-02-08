'use strict';
var controllername = 'post';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = [app.name + '.feedFactory'];

  function controller(feedFactory) {
    var vm = this;
    vm.message = 'Hello Post World';
    var activate = function() {
      vm.lastPost = null;
      vm.currentPost = null;

    };
    activate();

    vm.post = function(data) {
      var preparedData = data;
      preparedData.firebaseTimeStamp = new Date();
      console.log(preparedData);
      vm.sync = feedFactory.data();
      vm.sync.$push(preparedData).then(function(ref) {
        vm.currentPost = ref.key();
        vm.lastPost = feedFactory.asObject(vm.currentPost);
        console.log('success', ref.key());
      }, function(error) {
        console.log('Error', error);
      });
      vm.entry = null;
    }
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};