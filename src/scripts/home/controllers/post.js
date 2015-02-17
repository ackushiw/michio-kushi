'use strict';
var controllername = 'post';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = [app.name + '.feedFactory', '$mdToast', 'embedlyService'];

  function controller(feedFactory, $mdToast, embedlyService) {
    var vm = this;

    vm.message = 'Hello Post World';
    var activate = function() {

      //locker.put('test', vm.message);

      vm.currentPost = null;
      vm.recover = editLast;
      vm.processUrl = urlExtract;

    };
    activate();

    vm.post = function(data) {
      //locker.put('lastPost', data);
      var preparedData = data;
      preparedData.firebaseTimeStamp = new Date();
      //preparedData.$priority = data.title;
      console.log(preparedData);
      vm.sync = feedFactory.data();
      vm.sync.$push(preparedData).then(function(fireData) {
        vm.currentPost = fireData.key();
        vm.lastPost = feedFactory.asObject(vm.currentPost);
        //locker.put('lastPost', fireData);
        console.log('success', fireData.key());
      }, function(error) {
        console.log('Error', error);
      });
      vm.entry = null;
    };

    function urlExtract(url) {
      console.log(embedlyService);
      embedlyService.extract(url).then(function(data) {
        console.log('data', data);
        vm.articleData = data;
      }, function(error) {
        console.log('Error', error);
        vm.articleData = error;

      });

    }

    function editLast() {
      vm.currentPost = vm.lastPost;
      if(!vm.currentPost) {
        $mdToast.show($mdToast.simple().content('Cannot load last post'));
      }
    }

    function urlErrorToast() {
      $mdToast.show($mdToast.simple().content('Cannot load data from URL'));
    }

  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};