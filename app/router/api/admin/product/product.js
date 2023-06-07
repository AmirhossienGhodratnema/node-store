const router = require('express').Router();


// Controller
const ProductController = require('./../../../../controller/api/admin/productController');


// Options
const { uploadFile } = require('../../../../utils/upload');


router.get('/', uploadFile.single('image'), ProductController.create);



module.exports = {
    product: router,
}