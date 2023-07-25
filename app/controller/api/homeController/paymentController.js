const Controller = require("../../controller");



module.exports = new class HomeController extends Controller {
    async payment(req, res, next) {
        try {
            return res.status(200).json('Payment...');
        } catch (error) {
            next(error);
        };
    };
};