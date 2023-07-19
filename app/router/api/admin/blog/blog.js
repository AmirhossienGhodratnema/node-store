
const router = require('express').Router();


const { uploadFile } = require('../../../../utils/upload');

// Controller
const BlogController = require('../../../../controller/api/admin/blog/blogController')

// Validation
const { create } = require('./../../../../validation/admin/blogValidation')


router.post('/create', uploadFile.single('image'), create(), BlogController.create);
router.get('/test' ,BlogController.test);
router.get('/getAllBlogs', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlogId);
router.patch('/update/:id', uploadFile.single('image'), create(), BlogController.updateBlog);
router.delete('/:id', BlogController.remove);
module.exports = {
    blog: router
}