const router = require('express').Router();

const { uploadFile } = require('../../../../utils/upload');
// Controller
const CourseController = require('../../../../controller/api/admin/course/courseController');
const ChapterController = require('../../../../controller/api/admin/course/chapterController');

// Validation
const { create, chapter } = require('./../../../../validation/admin/courseValidation');



router.get('/', CourseController.index);
router.post('/create', uploadFile.single('image'), create(), CourseController.create);
router.get('/get/:id', CourseController.getCourseById);
router.put('/createCapter/create', ChapterController.createChapter);
router.get('/list/:id', ChapterController.chaptersList);
router.put('/remove/chapter/:id', ChapterController.remove);
router.patch('/update/chapter/:id', ChapterController.updateChapter);





module.exports = { course: router }