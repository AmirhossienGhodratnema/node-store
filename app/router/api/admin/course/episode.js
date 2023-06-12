const router = require('express').Router();

const { uploadFile } = require('../../../../utils/upload');
// Controller
const EpisodeController = require('../../../../controller/api/admin/course/episodeController');

// Validation
// const { create, chapter } = require('./../../../../validation/admin/courseValidation');


router.get('/', EpisodeController.index);






module.exports = { episode: router }