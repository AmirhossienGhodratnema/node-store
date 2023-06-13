const router = require('express').Router();

// Controller
const EpisodeController = require('./../../../../controller/api/admin/course/episodeController')

// Validation
const { create,edit } = require('./../../../../validation/admin/episodeValidation');

// Options
const { videoUpload } = require('../../../../utils/upload');



router.post('/create', videoUpload.single('video'), create(), EpisodeController.create);
router.delete('/remove/:id', EpisodeController.remove);
router.patch('/edit/:id', videoUpload.single('video'), edit(), EpisodeController.edit);



module.exports = { episode: router }