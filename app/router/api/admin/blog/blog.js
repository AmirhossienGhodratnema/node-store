
const router = require('express').Router();


const { uploadFile } = require('../../../../utils/upload');

// Controller
const BlogController = require('./../../../../controller/api/admin/blogController')

// Validation
const { create } = require('./../../../../validation/admin/blogValidation')


router.post('/create', uploadFile.single('image'), create(), BlogController.create);
router.get('/getAllBlogs', BlogController.getAllBlogs)

module.exports = {
    blog: router
}