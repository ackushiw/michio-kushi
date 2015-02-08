'use strict';
var servicename = 'feedFactory';

module.exports = function(app) {

  var dependencies = ['$firebase'];

  function service($firebase) {
    var ref = new Firebase('https://fabula.firebaseio.com/public/michiokushi');
    var sync = $firebase(ref);

    var feed = {
      data: fireData,
      ref: getDataRef,
      push: pushToFirebase,
      set: setInFirebase, //([key,]data)
      remove: removeFirebaseData, //([key])
      update: updateInFirebase, //([key,]data)
      asArray: syncArray,
      arrayAdd: add, //(newData)
      arraySave: saveIndex, //(recordOrIndex)
      arrayRemove: removeIndex, //(recordOrIndex)
      arrayIndex: indexFor, //(key)
      asObject: syncObject,
      objectPriority: getPriority,
      objectSetPriority: setPriority,
      objectRemove: removeObject,
      objectSave: saveObject
    };

    return feed;

    function fireData() {
      return sync;
    }

    function getDataRef(fireData) {
      if(fireData) {
        return fireData.$ref();
      } else {
        console.log("Error - noData");
      }
    }

    function pushToFirebase(newData) {
      if(newData) {
        return sync.$push(newData);
      } else {
        console.log("Error - noData");
      }
    }

    function setInFirebase(newKey, newData) {
      if(newKey) {
        return sync.$set(newKey, newData);
      } else {
        console.log('no Key');
      }
    }

    function removeFirebaseData(key) {
      return key.$remove();
    }

    function syncArray(fireData) {
      return fireData.$asArray();
    }

    function updateInFirebase(location, newData) {
      if(key) {
        return sync.$update(location, newData);
      } else {
        console.log('no key');
      }
    }

    function add(fireArray, newData) {
      return fireArray.$add(newData);
    }

    function saveIndex(fireArray, index) {
      return fireArray.$save(index);
    }

    function removeIndex(fireArray, index) {
      return fireArray.$remove(index);
    }

    function indexFor(fireArray, key) {
      return fireArray.$indexFor(key);
    }

    function syncObject(fireData) {
      return fireData.$asObject();
    }

    function getPriority(fireData) {
      var priority = fireData.$priority;
      console.log(priority);
      return priority;
    }

    function setPriority(fireData, newPriority) {
      var priority = fireData.$priority;
      priority = newPriority;
      console.log(priority);
      fireData.$save();
      return priority;
    }

    function removeObject(fireObj) {
      fireObj.$remove();
    }

    function saveObject(fireObj) {
      fireObj.$save();
    }

  }
  service.$inject = dependencies;
  app.factory(app.name + '.' + servicename, service);
};