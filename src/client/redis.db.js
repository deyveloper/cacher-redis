// Imports
const redis = require('redis');

// Environment variables
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || '6379';

// Init redis client
const client = redis.createClient({ host: 'localhost', port: '6379' });


module.exports = client;