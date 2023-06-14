
const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");




module.exports = new class PermissionController extends Controller {
    async create(req, res, next) {
        try {
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                success: true,
                message: 'Permission created'
            });
        } catch (error) {
            next(error);
        };
    };
};