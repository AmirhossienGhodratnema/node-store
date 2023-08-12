const Controller = require("../../controller");



module.exports = new class ChatController extends Controller {
    async index(req, res, next) {
        try {
            return res.render('chat', { title: 'چت', user: req.user });
        } catch (error) {
            next(error);
        };
    };
};