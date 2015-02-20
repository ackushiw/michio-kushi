'use strict';
/*eslint consistent-this:[2,  "imgurDropCtrl"] */
var directivename = 'imgurDrop';

module.exports = function(app) {

  // controller
  var controllerDeps = ['$scope', '$timeout', 'imgur'];
  var controller = function($scope, $timeout, imgur) {
    var imgurDropCtrl = this;
    $scope.test = 'test';
    console.log($scope.imgurDropCtrl.title);
    imgurDropCtrl.directivename = directivename;
  };
  controller.$inject = controllerDeps;

  /*eslint-disable consistent-this */

  // directive
  var directiveDeps = ['$timeout', 'imgur'];
  var directive = function($timeout, imgur) {
    return {
      restrict: 'AE',
      scope: {
        title: '@', // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
        imgurl: '=',
        imgpost: '&'
      },
      controller: controller,
      controllerAs: 'imgurDropCtrl',
      bindToController: true,
      template: require('./imgurDrop.html'),
      compile: function(tElement, tAttrs) {
        return {
          pre: function(scope, element, attrs) {
            // Define the Imgur.com API key.
            imgur.setAPIKey('Client-ID 8e4fdc212704bf0');

            /**
             * @property link
             * @type {String}
             */
            scope.link = '';
            scope.message = 'Drop Image...   ';

            /**
             * @method preventDefaultBehaviour
             * @param event {Object}
             * @return {void}
             */
            scope.preventDefaultBehaviour = function preventDefaultBehaviour(event) {
              event.preventDefault();
              event.stopPropagation();
            };

          },
          post: function(scope, element, attrs) {
            element.on('drop', function onDrag(event) {

              scope.preventDefaultBehaviour(event);
              var image = event.dataTransfer.files[0];
              scope.message = 'Uploading Image...';

              imgur.upload(image).then(function then(model) {
                console.log(model);

                scope.link = model.link;
                scope.imgurDropCtrl.imgpost({
                  data: model
                });
                scope.message = 'Uploaded Image!';

                $timeout(function timeout() {
                  scope.message = 'Drop Image...';
                }, 2500);

              });

            });

            // Prevent the default behaviour on certain events.
            element.on('dragover dragend dragleave', scope.preventDefaultBehaviour);

          }
        };
      }
    };
  };
  directive.$inject = directiveDeps;

  app.directive(directivename, directive);
};