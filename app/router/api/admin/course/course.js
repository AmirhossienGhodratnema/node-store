const router = require('express').Router();

const { uploadFile } = require('../../../../utils/upload');
// Controller
const CourseController = require('./../../../../controller/api/admin/courseController');

// Validation
const { create , chapter} = require('./../../../../validation/admin/courseValidation');



router.get('/', CourseController.index);
router.post('/create', uploadFile.single('image'), create(), CourseController.create);
router.get('/get/:id', CourseController.getCourseById);
router.post('/createCapter', CourseController.createChapter);




module.exports = { course: router }