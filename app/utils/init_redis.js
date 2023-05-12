const colors = require('colors')
const redisDB = require('redis');
const redisClient = redisDB.createClient();

redisClient.on('connect', () => console.log('Redis: Redis database is connecting...'.red.bold.italic));
redisClient.on('error', (err) => console.log('Redis: Redis error: '.red.bold.italic, err));
redisClient.on('ready', () => console.log('Redis: Redis database is ready...'.red.bold.italic));
redisClient.on('end', () => console.log('Redis: The Redis database was closed...'.red.bold.italic));

redisClient.connect();    // Running Redis


module.exports = {
    redisClient
}


