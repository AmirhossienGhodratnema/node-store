const { StatusCodes } = require("http-status-codes");
const Controller = require("../../controller");


module.exports = new class CourseController extends Controller {
    async index(req, res, next) {
        try {
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'Course controller'
            });
        } catch (error) {
            next(error);
        };
    };
};