const router = require('express').Router();


// Controller
const ProductController = require('./../../../../controller/api/admin/productController');

// Validation
const { create } = require('./../../../../validation/admin/productValidation')

// Options
const { uploadFile } = require('../../../../utils/upload');


router.get('/', uploadFile.single('image'), create(), ProductController.create);
router.get('/getAll', ProductController.getAll);


module.exports = {
    product: router,
}