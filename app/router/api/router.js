const route = require('express').Router();


const { redisClient } = require('../../utils/init_redis');
const { homeRoute } = require('./index');

// (async () => {
//     await redisClient.set('Name', 'Amirhossein');
//     const value = redisClient.get('Name');
// })()

route.use('/api/v1', homeRoute);





module.exports = { AllRoutesApi: route };