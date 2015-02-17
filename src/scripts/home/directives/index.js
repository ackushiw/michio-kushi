'use strict';

module.exports = function(app) {
    // inject:start
    require('./feedWidget')(app);
    // inject:end
};