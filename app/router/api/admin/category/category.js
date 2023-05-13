const router = require('express').Router();


// Controller
const CategoryController = require('../../../../controller/api/admin/categoryController');

// Validation
const { create } = require('./../../../../validation/admin/categoryValidation')

router.post('/create', create(), CategoryController.create);


module.exports = { category: router }