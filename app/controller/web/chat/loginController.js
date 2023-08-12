const { StatusCodes } = require("http-status-codes");
const { createError } = require("../../../../functions/golobal");
const { User } = require("../../../models/user");
const Controller = require("../../controller");
const { signToken } = require("../../../utils/auth");



module.exports = new class LoginController extends Controller {
    async login(req, res, next) {
        try {
            return res.render('login', { title: 'ورود' })
        } catch (error) {
            next(error);
        };
    };

    async check(req, res, next) {
        try {
            const { phone } = req.body;
            const user = await User.findOne({ phone });
            if (!user) await createError(StatusCodes.BAD_REQUEST, 'User is not definde');
            const token = await signToken(user._id);
            req.user = user;
            await res.cookie('auth', token, { signed: true, httpOnly: true });
            return res.redirect('/chat')
        } catch (error) {
            next(error);
        };
    };
};