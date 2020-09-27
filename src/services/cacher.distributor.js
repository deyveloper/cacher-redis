// Imports
const { cacherController } = require('../controllers');


const cacherDistributor = (req, res) => {
    cacherController.init(req, res);
};

module.exports = cacherDistributor;