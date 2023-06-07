const Controller = require("../../controller");




module.exports = new class ProductController extends Controller {
    async getAll(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Get all products'
            });
        } catch (error) {
            next(error);
        };
    };
};