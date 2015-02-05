'use strict';

module.exports = function(app) {
    // inject:start
    require('./main')(app);
    require('./nav')(app);
    // inject:end
};