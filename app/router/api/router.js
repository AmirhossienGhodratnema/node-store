const route = require('express').Router();


const { homeRoute } = require('./index');




route.use('/api', homeRoute);



module.exports = { AllRoutesApi: route };