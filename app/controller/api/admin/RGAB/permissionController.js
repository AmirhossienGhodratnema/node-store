
const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");




module.exports = new class PermissionController extends Controller {
    async create(req, res, next) {
        try {
            return res.status(StatusCodes.CREATED).json({
                status: StatusCodes.CREATED,
                success: true,
                message: 'Permissio'
            })
        } catch (error) {
            next(error);
        };
    };
};