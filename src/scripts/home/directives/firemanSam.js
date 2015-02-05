'use strict';
/*eslint consistent-this:[2,  "firemanSamCtrl"] */
var directivename = 'firemanSam';

module.exports = function(app) {

  // controller
  var controllerDeps = ['$scope', '$firebase'];
  var controller = function($scope, $firebase) {
    var firemanSamCtrl = this;
    var vm = firemanSamCtrl;
    //Firebase URL
    var FBURL = 'https://fabula.firebaseio.com/public/michiokushi';
    var fireRef = new Firebase(FBURL);

    vm.sync = $firebase(fireRef);
    vm.list = vm.sync.$asArray();

    $scope.save = function(data) {
      vm.list.$add(data);
      console.log('saved');
      $scope.post = null;
    };
    $scope.editor = false;
    vm.showEditorTools = function() {
      $scope.editor = !$scope.editor;
      $scope.msnrylayout();
    };

    //tags
    $scope.tags = [{
      name: 'See'
    }, {
      name: 'how'
    }, {
      name: 'amazing'
    }, {
      name: 'is'
    }, {
      name: 'AngularJS'
    }];

    firemanSamCtrl.directivename = directivename;
  };
  controller.$inject = controllerDeps;

  // directive
  var directiveDeps = [];
  var directive = function() {
    return {
      restrict: 'AE',
      scope: {
        title: '@', // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
        firebase: '@',
        msnrylayout: '&'
      },
      controller: controller,
      controllerAs: 'firemanSamCtrl',
      bindToController: true,
      template: require('./firemanSam.html'),
      link: function(scope, element, attrs) {
        console.log(scope.firebase);

      }
    };
  };
  directive.$inject = directiveDeps;

  app.directive(directivename, directive);
};