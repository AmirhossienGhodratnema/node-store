const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");
const { ValidationData, uniqueTitle, deleteInvalidPropertyInObject, unlinkPhoto, createError } = require("../../../../../functions/golobal");
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
            console.log('videoAddres', videoAddres)
            console.log('videoUrl', videoUrl)
            const episodes = {
                title,
                description,
                type,
                time: realTime,
                video: videoAddres,
                chapter,
                course
            };
            const createEpisode = await Course.updateOne({ _id: course, 'chapters._id': chapter }, {
                $push: { 'chapters.$.episodes': episodes }
            });
            if (createEpisode.modifiedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'The episode was not saved');
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
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

};