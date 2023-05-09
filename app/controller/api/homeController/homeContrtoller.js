const autoBind = require("auto-bind");
const Controller = require("../../controller");



module.exports = new class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.status(200).json('Index page');
        } catch (error) {
            next(error);
        };
    };
};