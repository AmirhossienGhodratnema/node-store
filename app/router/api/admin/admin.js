const router = require('express').Router();

// Admin router
const { category } = require('./category/category');
const { blog } = require('./blog/blog');
const { product } = require('./product/product');
const { course } = require('./course/course');
const { episode } = require('./course/episode');
const { user } = require('./user/user');


router.use('/category', category);
router.use('/blog', blog);
router.use('/product', product);
router.use('/course', course);
router.use('/episode', episode);
router.use('/user', user);



router.get('/', (req, res, next) => {
    return res.json('Admin');
});

module.exports = {
    AdminRouter: router
}