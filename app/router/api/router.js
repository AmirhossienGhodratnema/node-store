const route = require('express').Router();
const test = require('./test')


route.use('/api', (req, res, next) => {
    return res.json('Api route');
});



module.exports = { AllRoutesApi: route };