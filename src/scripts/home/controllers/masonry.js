'use strict';
var controllername = 'masonry';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = [];

  function controller() {
    var vm = this;

    //masonry
    var Masonry = require('masonry-layout');

    var msnry = new Masonry('.masonry-container', {
      // options...
      columnWidth: '.grid-sizer',
      gutter: 0,
      itemSelector: '.item'
    });
    vm.message = 'Hello World';
    var activate = function() {

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};