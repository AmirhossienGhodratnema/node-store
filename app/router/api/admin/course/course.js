const router = require('express').Router();

// Controller
const CourseController = require('./../../../../controller/api/admin/courseController');

// Validation
const { create } = require('./../../../../validation/admin/courseValidation');



router.get('/', CourseController.index);



module.exports = { course: router }