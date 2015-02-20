'use strict';

module.exports = function(app) {
    // inject:start
    require('./feedWidget')(app);
    require('./imgurDrop')(app);
    // inject:end
};