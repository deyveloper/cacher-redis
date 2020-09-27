// Imports
const redis = require('async-redis');


// Environment variables
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

// Init redis client
const client = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT });

module.exports = client;