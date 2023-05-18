
const router = require('express').Router();


// Controller
const BlogController = require('./../../../../controller/api/admin/blogController')


router.get('/create', BlogController.create);


module.exports = {
    blog: router
}