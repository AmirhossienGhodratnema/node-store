const { StatusCodes } = require("http-status-codes");
const Controller = require("../../controller");
const { Course } = require("../../../models/course");


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
};