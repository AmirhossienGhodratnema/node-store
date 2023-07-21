const { createError, deleteInvalidPropertyInObject } = require("../../../../../functions/golobal");
const { User } = require("../../../../models/user");
const Controller = require("../../../controller");
const { StatusCodes } = require("http-status-codes");




module.exports = new class UserController extends Controller {
    async index(req, res, next) {
        try {
            const { search } = req.query;
            return res.json(req.user)
            let dbQuery = {}
            if (search) dbQuery['$text'] = { $search: search };
            const user = await User.find(dbQuery);    // Gettin all user.
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


    async userUpdate(req, res, next) {
        try {
            const userId = req.user._id;    // Get user.
            const data = req.body;    // Getting data from body.

            const blackList = ['password', 'otp', 'courses', 'bills', 'disCount', 'rols'];
            const mainList = ['firstName', 'lastName', 'phone', 'userName', 'email'];
            await deleteInvalidPropertyInObject(data, blackList, mainList);

            const user = await User.updateOne({ '_id': userId }, {    // Update user
                $set: data
            });
            if (user.modifiedCount == 0) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Update failed')    // Error
            return res.json({
                status: StatusCodes.OK,
                success: true,
                message: 'Update user profile'
            });
        } catch (error) {
            next(error);
        };
    };


    async addRole(req, res, next) {
        try {
            const { userID, role } = req.body;
            const user = await User.findOne({ '_id': userID });
            if (!user) await createError(StatusCodes.INTERNAL_SERVER_ERROR, 'User not found');
            const updateUser = await User.updateOne({ '_id': userID }, { $set: { role } });
            if (updateUser.modifiedCount == 0) createError(StatusCodes.INTERNAL_SERVER_ERROR, 'Role not update');
            return res.status(StatusCodes.OK).json({
                status: StatusCodes.OK,
                success: true,
                message: 'Add role',
                updateUser
            })
        } catch (error) {
            next(error);
        };
    };

    async test(req, res, next) {
        try {
            const user = await User.find({ _id: req.user._id }).populate([
                { path: 'basketUser', populate: [{path: 'product.product'}] }
            ]);
            return res.json(user)
        } catch (error) {
            next(error);
        };
    };
};