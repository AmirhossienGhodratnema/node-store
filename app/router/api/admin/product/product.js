const router = require('express').Router();


// Controller
const ProductController = require('./../../../../controller/api/admin/productController');


router.get('/', ProductController.getAll);



module.exports = {
    product: router,
}