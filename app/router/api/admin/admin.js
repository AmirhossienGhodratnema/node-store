const router = require('express').Router();

// Admin router
const { category } = require('./category/category');


router.use('/category', category);

router.get('/', (req, res, next) => {
    return res.json('Admin');
});

module.exports = {
    AdminRouter: router
}