'use strict';

module.exports = function(app) {
    // inject:start
    require('./feed')(app);
    require('./firemanSam')(app);
    // inject:end
};