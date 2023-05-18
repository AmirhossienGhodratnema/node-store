const Controller = require("../../controller");




module.exports = new class BlogController extends Controller {
    async create(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                success: true,
                data: 'Blog controller is ok',
            });
        } catch (error) {
            next(error);
        };
    };
};