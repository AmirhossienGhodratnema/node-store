const { StatusCodes } = require("http-status-codes");
const Controller = require("../../../controller");






module.exports = new class EpisodeController extends Controller {
    async index(req, res, next) {
        try {
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'Episode controller...'
            })
        } catch (error) {
            next(error);
        };
    };
};