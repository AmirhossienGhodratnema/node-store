const router = require('express').Router();


// Controller
const ProductController = require('./../../../../controller/api/admin/productController');

// Validation
const { create } = require('./../../../../validation/admin/productValidation')

// Options
const { uploadFile } = require('../../../../utils/upload');


router.get('/', uploadFile.array('images', 10), create(), ProductController.create);
router.get('/getAll', ProductController.getAll);
router.get('/:id', ProductController.getById);


module.exports = {
    product: router,
}