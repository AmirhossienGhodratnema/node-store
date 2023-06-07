const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { redisClient } = require('../utils/init_redis');


async function verifyToken(req, res, next) {
    try {
        let token = req.body.token || req.query.token || req.headers.token;
        if (token) {
            let tokenVerify = await jwt.verify(token, process.env.JSON_WEBTOKEN_SECURECODE);
            const user = await User.findOne({ phone: tokenVerify.phone }, { password: 0, otp: 0, });
            if (!user) throw { status: 400, message: 'There is no user' };
            req.user = user;
            return next();
        };
        throw { status: 400, message: 'token is not defind' }
    } catch (error) {
        next(error);
    };
};

async function verifyRefreshToken(token) {
    try {
        return new Promise(async (resolve, reject) => {
            let tokenVerify = await jwt.verify(token, process.env.JSON_WEBTOKEN_SECURECODE);
            const user = await User.findOne({ phone: tokenVerify.phone }, { password: 0, otp: 0, });
            if (!user) reject({ status: 400, message: 'There is no user' });
            const refreshTokenRedis = await redisClient.get(user.id);
            if (token !== refreshTokenRedis) reject({ status: 400, message: 'Token is wrong...' })
            resolve(tokenVerify.phone)
        })
    } catch (error) {
        next(error);
    };
};



module.exports = {
    verifyToken,
    verifyRefreshToken
}