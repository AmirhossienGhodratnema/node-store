
const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");
const { ValidationData } = require("../../../../../functions/golobal");




module.exports = new class PermissionController extends Controller {
    async create(req, res, next) {
        try {
            const { title, description } = req.body;
            await ValidationData(req);
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