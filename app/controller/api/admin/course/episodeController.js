const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");
const { ValidationData, uniqueTitle, deleteInvalidPropertyInObject, unlinkPhoto, createError, checkMongoId } = require("../../../../../functions/golobal");
const { Course } = require('./../../../../models/course');
const { getVideoDurationInSeconds } = require('get-video-duration')
const path = require('path');
const { getTime } = require("../../../../utils/getTime");



module.exports = new class EpisodeController extends Controller {
    async create(req, res, next) {
        try {
            const { title, description, type, chapter, course, video, fileUploadPath, filename } = req.body;
            await ValidationData(req);    // Data fields validation.
            const mainFields = ['title', 'description', 'type', 'chapter', 'course', 'video', 'fileUploadPath', 'filename'];    // The main fields to be saved in the database.
            await deleteInvalidPropertyInObject(req.body, [], mainFields);     // Check chapter and remove some fiels.
            const videoAddres = path.join(fileUploadPath, filename).replace(/\\/g, '/');    // Create the url of the video.
            const videoUrl = `${process.env.BASE_URL}${process.env.SERVER_PORT}/${videoAddres}`;    // Getttin the complete video address.
            const duration = await getVideoDurationInSeconds(videoUrl);    // Capture seconds of video.
            const realTime = await getTime(duration);    // Get real time video.
            const episodes = {    // Create episode object
                title,
                description,
                type,
                time: realTime,
                video: videoAddres,
                chapter,
                course
            };
            const createEpisode = await Course.updateOne({ _id: course, 'chapters._id': chapter }, {    // Save episode
                $push: { 'chapters.$.episodes': episodes }
            });
            if (createEpisode.modifiedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The episode was not saved');    // Error if not added.
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                success: true,
                message: 'The episode was saved',
            })
        } catch (error) {
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
                await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            };
            next(error);
        };
    };


    async remove(req, res, next) {
        try {
            const { id } = req.params;    // Get id from params.
            await checkMongoId(id);    // Check mongoId.
            const episode = await Course.findOne({ 'chapters.episodes._id': id });    // Gettin the episode for its authenticity.
            if(!episode) await createError(StatusCodes.NOT_FOUND, 'There is no such episode');    // Error for There is no such episode.
            const updateResult = await Course.updateOne({ 'chapters.episodes._id': id }, {    // Update and remove episode.
                $pull: {
                    'chapters.$.episodes': {
                        _id: id
                    }
                }
            })
            if (updateResult.modifiedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The episode was not deleted');    // Error: episode was not deleted
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'The episode was deleted'
            });
        } catch (error) {
            next(error);
        };
    };

};