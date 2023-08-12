const jwt = require('jsonwebtoken');
const { User } = require('../models/user');




async function checkLoginForChat(req, res, next) {
    try {
        const auth = req.signedCookies.auth;
        if (!auth) return res.redirect('/login');
        next();
    } catch (error) {
        next(error);
    };
};

async function checkAccessLoing(req, res, next) {
    try {
        const token = req.signedCookies.auth;
        if (token) {
            let tokenVerify = await jwt.verify(token, process.env.JSON_WEBTOKEN_SECURECODE);
            const user = await User.findOne({ phone: tokenVerify.phone }, { password: 0, otp: 0, });
            if (!user) throw { status: 400, message: 'There is no user' };
            req.user = user;
            console.log('user', user);
            return next();
        };
        throw { status: 400, message: 'token is not defind' }
    } catch (error) {
        next(error);
    };
};



module.exports = {
    checkLoginForChat,
    checkAccessLoing
}