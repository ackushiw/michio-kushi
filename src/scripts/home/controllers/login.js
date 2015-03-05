'use strict';
var controllername = 'login';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = ['$rootScope'];

  function controller($rootScope) {
    var vm = this;

    var activate = function() {
      vm.signIn = function(service) {
        $rootScope.authObj.$authWithOAuthPopup(service).then(function(authData) {
          console.log("Logged in as:", authData.uid);
          $rootScope.userAuth = authData;
          $rootScope.user_ID = authData.uid;
          $rootScope.userProfile = authData.facebook.cachedUserProfile;
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
      }

    };
    activate();
  }

  controller.$inject = deps;
  app.controller(app.name + '.' + controllername, controller);
};