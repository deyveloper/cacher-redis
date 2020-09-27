// Imports
const CacherRoute = require('./cacher.route');


class Routes {
    constructor(router) {
        this.router = router;
    };

    init() {
        new CacherRoute(this.router).init();
    };
};


module.exports = Routes;