const { createError } = require("../../../../../functions/golobal");
const { User } = require("../../../../models/user");
const Controller = require("../../../controller");
const { StatusCodes } = require("http-status-codes");




module.exports = new class UserController extends Controller {
    async index(req, res, next) {
        try {
            const user = await User.find({});    // Gettin all user.
            if (!user) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'User is not defind');    // Error not user
            return res.json({
                status: StatusCodes.OK,
                success: true,
                user
            })
        } catch (error) {
            next(error);
        };
    };
};