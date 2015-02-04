'use strict';

module.exports = function(app) {
    // inject:start
    require('./feed')(app);
    // inject:end
};