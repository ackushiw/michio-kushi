'use strict';

module.exports = function(app) {
    // inject:start
    require('./feedFactory')(app);
    // inject:end
};