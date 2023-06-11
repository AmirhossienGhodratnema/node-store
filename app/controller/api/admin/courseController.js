const { StatusCodes } = require("http-status-codes");
const Controller = require("../../controller");
const { Course } = require("../../../models/course");
const { uploadFile } = require("../../../utils/upload");
const { filesUpload, fileUploadSingle, createError, ValidationData, unlinkPhoto } = require("../../../../functions/golobal");


const AllowedList = [
    'image',
    'title',
    'shortText',
    'shortDescription',
    'description',
    'tags',
    'category',
    'status',
    'teacher',
    'creator',
    'type',
    'price',
    'fileUploadPath',
    'filename',
    'time'
];
// Object.freeze(AllowedList);


module.exports = new class CourseController extends Controller {
    async index(req, res, next) {
        try {
            const search = req.query.search;
            let course;
            if (search) {
                course = await Course.find({ $text: { $search: search } });
                return res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    success: true,
                    tipo: 'search',
                    course
                })
            } else {
                course = await Course.find();
                return res.status(StatusCodes.OK).json({
                    status: StatusCodes.OK,
                    success: true,
                    course
                });
            };
        } catch (error) {
            next(error);
        };
    };


    async create(req, res, next) {
        try {
            const data = req.body;    // Getting data from req.body.
            await ValidationData(req);    // Validation data and throw error.
            const image = await fileUploadSingle(req.body);    // Getting image path.
            await this.cleaning(data);    // Data cleaning
            const course = await Course.create({    // Save course in DB
                ...data,
                image,
                status: 'noStart',
            });
            if (!course._id) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Course not created');    // Error courser not created.
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'Create course true',
            });
        } catch (error) {
            if (req?.body?.fileUploadPath && req?.body?.filename) {
                const { fileUploadPath, filename } = req.body;    // Get fiels for unlinkPhoto.
                await unlinkPhoto(fileUploadPath, filename);     // Delete image.
            }
            next(error);
        };
    };


    async cleaning(data) {
        return Object.keys(data).map(key => {
            if (process.env.illegal.includes(data[key])) delete data[key];    // Remove unauthorized fields.
            if (!AllowedList.includes(key)) delete data[key];    // Delete items that are not allowed to be sent.
            if (typeof data[key] == 'string') data[key] = data[key].trim();    // Removing extra spaces at the beginning and end of fields that are strings
            if (Array.isArray(data[key])) data[key] = data[key].map(item => item.trim());    // Removing the first and last space of each index in the presentation.
        });
    }
};