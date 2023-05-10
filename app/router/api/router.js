const route = require('express').Router();


const { homeRoute } = require('./index');



route.use('/api/v1', homeRoute);





module.exports = { AllRoutesApi: route };