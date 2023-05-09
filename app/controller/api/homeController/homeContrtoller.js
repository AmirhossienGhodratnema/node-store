const autoBind = require("auto-bind");
const Controller = require("../../controller");


module.exports = new class HomeController extends Controller {
    indexPage(req, res, next) {
        try {
            return res.json('Index page');
        } catch (error) {
            next(error);
        };
    };
};