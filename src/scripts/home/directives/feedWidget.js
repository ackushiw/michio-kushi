'use strict';
/*eslint consistent-this:[2,  "feedWidgetCtrl"] */
var directivename = 'feedWidget';

module.exports = function(app) {

  // controller
  var controllerDeps = [];
  var controller = function() {
    var feedWidgetCtrl = this;
    feedWidgetCtrl.directivename = directivename;
  };
  controller.$inject = controllerDeps;

  /*eslint-disable consistent-this */

  // directive
  var directiveDeps = [];
  var directive = function() {
    return {
      restrict: 'AE',
      scope: {
        title: '@', // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
        url: '@',
        data: '@'
      },
      controller: controller,
      controllerAs: 'feedWidgetCtrl',
      bindToController: true,
      template: require('./feedWidget.html'),
      compile: function(tElement, tAttrs) {
        return {
          pre: function(scope, element, attrs) {

          },
          post: function(scope, element, attrs) {

          }
        };
      }
    };
  };
  directive.$inject = directiveDeps;

  app.directive(directivename, directive);
};