'use strict';

module.exports = function(app) {
    // inject:start
    require('./feed')(app);
    require('./main')(app);
    require('./masonry')(app);
    require('./nav')(app);
    require('./sidenav')(app);
    // inject:end
};