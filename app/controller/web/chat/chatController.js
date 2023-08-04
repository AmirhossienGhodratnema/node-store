const Controller = require("../../controller");



module.exports = new class ChatController extends Controller {
    async index(req, res, next) {
        try {
            return res.render('chat', {title: 'چت'})
            return res.status(200).json('Chat controller');
        } catch (error) {
            next(error);
        };
    };
};