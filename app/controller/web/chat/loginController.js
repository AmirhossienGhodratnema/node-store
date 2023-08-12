const Controller = require("../../controller");



module.exports = new class LoginController extends Controller {
    async login(req, res, next) {
        try {
            return res.render('login',  {title: 'ورود'})
        } catch (error) {
            next(error);
        };
    };
};