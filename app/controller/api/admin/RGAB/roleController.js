const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");




module.exports = new class RoleController extends Controller {
    async create(req, res, next) {
        try {
            return res.json({
                status: StatusCodes.CREATED,
                success: true,
                message: 'Role created',
            })
        } catch (error) {
            next(error);
        };
    };
};