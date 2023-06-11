const router = require('express').Router();


// Controller
const CategoryController = require('../../../../controller/api/admin/category/categoryController');

// Validation
const { create, edit } = require('./../../../../validation/admin/categoryValidation')

router.post('/create', create(), CategoryController.create);
router.post('/get-all-parents', CategoryController.getAllParents);
router.get('/all', CategoryController.getAllCategory);
// router.get('/all-populate', CategoryController.getAllCategoryPOPInMethod);
router.get('/all-pre', CategoryController.getAllPre);
router.patch('/edit', edit(), CategoryController.edit);
router.delete('/remove-one/:id', CategoryController.removeOne);
router.post('/get-child/:id', CategoryController.getChild);





module.exports = { category: router }