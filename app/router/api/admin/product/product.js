const router = require('express').Router();




router.get('/', (req, res, next) => {
    return res.json('Product route is ok');
});



module.exports = {
    product: router,
}