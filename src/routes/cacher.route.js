// Imports
const express = require('express');
const { checkProjectMDW } = require('../services/middleware');
const cacherDistributor = require('../services/cacher.distributor');

class CacherRoute {
    constructor(router) {
        this.router = router;
    };

    init() {
        this.router.all('/webhook/:project', checkProjectMDW, cacherDistributor);
    };
};


module.exports = CacherRoute;
