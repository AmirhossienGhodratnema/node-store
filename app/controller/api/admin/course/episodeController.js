const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");
const { ValidationData, uniqueTitle, deleteInvalidPropertyInObject, unlinkPhoto } = require("../../../../../functions/golobal");
const { Course } = require('./../../../../models/course');





module.exports = new class EpisodeController extends Controller {
    async create(req, res, next) {
        try {
            const data = req.body;
            await ValidationData(req);    // Data fields validation.
            const mainFields = ['title', 'description', 'type', 'chapter', 'course', 'video', 'fileUploadPath', 'filename'];    // The main fields to be saved in the database.
            await deleteInvalidPropertyInObject(data, [], mainFields);     // Check chapter and remove some fiels.


            console.log(req.file)

            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'Episode controller...',
                data
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