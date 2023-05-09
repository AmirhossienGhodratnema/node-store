const route = require('express').Router();




route.get('/1', (req, res, next) => {
    return res.json('Main route test api...')
});



module.exports = { route };