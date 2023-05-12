const { verify } = require("jsonwebtoken");
const { User } = require("../../../models/user");
const { randomNumber, saveUser, signToken, signRefreshToken } = require("../../../utils/auth");
const Controller = require("../../controller");
const { verifyRefreshToken } = require("../../../middleware/verifytoken");




module.exports = new class AuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            const { phone } = req.body;
            const checkingBody = await this.validationData(req);    // Check input information.
            if (checkingBody) throw { status: 403, message: checkingBody };    // Input information error.
            const code = await randomNumber();    // Generate random code.
            await saveUser(phone, code);    // Checking the user (creating a user or updating the code for user login)
            return res.json({
                status: 200,
                success: true,
                code,
                message: 'Security code sent successfully',
                phone
            })
        } catch (error) {
            next(error);
        };
    };


    async checkOtp(req, res, next) {
        try {
            const { phone, code } = req.body;
            const checkingBody = await this.validationData(req);
            if (checkingBody) throw { status: 403, message: checkingBody };
            const user = await User.findOne({ phone });
            if (!user) throw { status: 400, message: 'There is no such user' };
            if (user.otp.code != code) throw { status: 400, message: 'The one-time password is incorrect' };
            const date = new Date().getTime()
            if (user.otp.expireIn < date) throw { status: 400, message: 'The one-time code has expired' }
            const token = await signToken(user._id);
            const refreshToken = await signRefreshToken(user.id);
            return res.json({
                token,
                refreshToken
            });
        } catch (error) {
            next(error);
        };
    };


    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const phone = await verifyRefreshToken(refreshToken);
            const user = await User.findOne({ phone });
            const accessToken = await signToken(user._id);
            const newRefreshToken = await signRefreshToken(user.id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            });
        } catch (error) {
            next(error);
        };
    };
};

