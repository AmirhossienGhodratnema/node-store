const Controller = require("../../controller");
const bcrypt = require('bcrypt')


module.exports = new class DeveloperController extends Controller {
    async hashPassword(req, res, next) {
        try {
            const { password } = req.query;
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(process.env.SECRET_KEY_COOKIE_PARSER, salt);
            return res.json(hash)
        } catch (error) {
            next(error);
        };
    };
}; 