// Environment config
require('dotenv').config();
// Imports
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cacheController = require('./controllers/CacherController');
const Routes = require('./routes');

const PORT = process.env.PORT;
const projects = require('./services/projects.service');
global["projects"] = projects;

// Init app
const app = express();


// Configure app
// middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 100000, limit: '50mb' }));
// Routing config
const router = express.Router();
app.use(router);
new Routes(router).init();

  


// Init server
const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

module.exports = app;