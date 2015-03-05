'use strict';

module.exports = function(app) {
    // inject:start
    require('./feed')(app);
    require('./login')(app);
    require('./main')(app);
    require('./masonry')(app);
    require('./nav')(app);
    require('./post')(app);
    require('./sidenav')(app);
    // inject:end
};