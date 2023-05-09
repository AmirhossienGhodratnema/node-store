const route = require('express').Router();



route.get('/', (req, res, next) => {
    return res.json('Main route web...')
});



module.exports = { AllRoutesWeb: route };