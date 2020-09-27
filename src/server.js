// Environment config
require('dotenv').config();
// Imports
const redisClient = require('./client/redis.db');


// Max listeners (infinity)
redisClient.setMaxListeners(0);