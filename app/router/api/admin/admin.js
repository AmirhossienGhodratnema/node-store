const router = require('express').Router();

// Admin router
const { category } = require('./category/category');
const { blog } = require('./blog/blog');
const { product } = require('./product/product');


router.use('/category', category);
router.use('/blog', blog);
router.use('/product', product);



router.get('/', (req, res, next) => {
    return res.json('Admin');
});

module.exports = {
    AdminRouter: router
}