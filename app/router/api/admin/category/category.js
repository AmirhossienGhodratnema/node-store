const router = require('express').Router();


// Controller
const CategoryController = require('../../../../controller/api/admin/categoryController');

// Validation
const { create } = require('./../../../../validation/admin/categoryValidation')

router.post('/create', create(), CategoryController.create);
router.post('/get-all-parents', CategoryController.getAllParents);
router.post('/get-child/:id', CategoryController.getChild);
router.get('/all', CategoryController.getAllCategory);




module.exports = { category: router }