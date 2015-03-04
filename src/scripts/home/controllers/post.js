'use strict';
var controllername = 'post';

module.exports = function(app) {
  /*jshint validthis: true */

  var deps = [app.name + '.feedFactory', '$mdToast', 'embedlyService', 'uiGmapGoogleMapApi'];

  function controller(feedFactory, $mdToast, embedlyService, uiGmapGoogleMapApi) {
    var vm = this;

    vm.message = 'Hello Post World';
    vm.testInit = function() {
      console.log(vm.message);
    }
    var searchEvents = {
      places_changed: function(searchBox) {
        var places = searchBox.getPlaces()

        if(places.length == 0) {
          return;
        } else {
          console.log(places);
        }
      }
    }

    vm.mapSearch = {
      position: 'top-left',
      template: 'searchbox.tpl.html',
      options: {
        autocomplete: true
      },
      events: searchEvents
    };

    vm.autocompleteResults = [{
      defaultItem: {
        description: 'default'
      }
    }];
    var activate = function() {
      uiGmapGoogleMapApi.then(function(maps) {
        vm.map = {
          center: {
            latitude: 0,
            longitude: 0
          },
          zoom: 1
        };
        console.log(maps);
        vm.mapAuto = new google.maps.places.AutocompleteService();
        console.log(vm.mapAuto);
        vm.queryGooglePlaces = function(query) {
          console.log(query);
          if(query) {
            var queryObject = {
              input: query
            };
            var results = vm.mapAuto.getPlacePredictions(queryObject, resultsCallback);
            console.log(results);
          } else {
            return [];
          }

        };
        vm.loadPlaceData = function() {
          console.log('Result is: ');
        };

        function resultsCallback(array, status) {
          console.log(array);
          vm.autocompleteResults = array;
          console.log(array[0].place_id);
          vm.mapPlaces = new google.maps.places.PlacesService(maps.Map);
          var details_id = array[0].place_id;
          var details = vm.mapPlaces.getDetails(details_id, detailsCallback);

          console.log(status);
        }

      });

      function detailsCallback(result, status) {
        console.log(result);
        console.log(status);
      }

      //locker.put('test', vm.message);
      require('datejs');
      console.log(Date.today());
      vm.currentPost = null;
      vm.recover = editLast;
      vm.processUrl = urlExtract;

    };
    activate();

    vm.post = function(data) {
      //locker.put('lastPost', data);

      var preparedData = data;
      preparedData.firebaseTimeStamp = Firebase.ServerValue.TIMESTAMP;
      preparedData.date = Date.parse(vm.testDate) / 1000;

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

    vm.getImgurUrl = function(data) {
      console.log('imgur test', data);
      vm.entry = {
        id: data.id || null,
        title: data.title || null,
        description: data.description || null,
        url: data.link || null,
        //favicon_url: data.favicon_url || null,
        mainImage: {
          url: data.link || null,
          height: data.height || null,
          width: data.width || null,
          size: data.size || null,
        },
        type: data.type || null,
        animated: data.animated || null,
        //provider_name: data.provider_name || null,
        published: data.datetime || null
      };
    };

    function urlExtract(url) {
      console.log(embedlyService);
      embedlyService.extract(url).then(function(embedlyData) {
        console.log('data', embedlyData);
        vm.articleData = embedlyData;
        vm.entry = {
          title: embedlyData.data.title || null,
          description: embedlyData.data.description || null,
          url: embedlyData.data.url || null,
          favicon_url: embedlyData.data.favicon_url || null,
          mainImage: {
            url: embedlyData.data.images[0].url || null,
            height: embedlyData.data.images[0].height || null,
            width: embedlyData.data.images[0].width || null
          },
          media: {
            duration: embedlyData.data.media.duration || null,
            height: embedlyData.data.media.height || null,
            html: embedlyData.data.media.html || null,
            type: embedlyData.data.media.type || null,
            width: embedlyData.data.media.width || null
          },
          provider_name: embedlyData.data.provider_name || null,
          published: embedlyData.data.published || null
        };
        if(vm.entry.media.html) {
          vm.entry.mediaEmbed = embedlyData.data.media.type || true;
        } else {
          vm.entry.mediaEmbed = false;
        }
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