const router = require('express').Router();

// Controller
const EpisodeController = require('./../../../../controller/api/admin/course/episodeController')

// Validation
const { create } = require('./../../../../validation/admin/episodeValidation');

// Options
const { videoUpload } = require('../../../../utils/upload');



router.post('/create', videoUpload.single('video'), create(), EpisodeController.create);




module.exports = { episode: router }