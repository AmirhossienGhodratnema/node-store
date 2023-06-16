const { User } = require('./../models/user');
const { sign } = require('jsonwebtoken');
const { redisClient } = require('./init_redis');

// -------------------- *** -------------------- 

// Generate random code
async function randomNumber() {
    return Math.floor((Math.random() * 90000) + 10000)
};

// -------------------- *** -------------------- 

async function saveUser(phone, code) {
    const dateEXP = new Date().getTime() + 120000;
    let otp = {    // Create otp for user
        code,
        expireIn: dateEXP
    };
    const result = await checkExistUser(phone);    // Checking the existence of a user.
    if (result) {
        return (await updateUser(phone, {    // Update the user.
            otp: {
                code,
                expireIn: dateEXP
            },
        }));
    };
    return !!(await User.create({    // Create new user.
        phone,
        otp,
    }));
};

// Checking the existence of a user.
async function checkExistUser(phone) {
    const user = await User.findOne({ phone });
    return !!user;
};

// Update the user.
async function updateUser(phone, objectData = {}) {
    Object.keys(objectData).forEach(key => {
        if (['', ' ', 0, null, undefined, NaN, null].includes(objectData[key])) delete objectData[key]   // Delet invalid data
    })
    const uploadResult = await User.updateOne({ phone }, { $set: objectData })
    return !!uploadResult.modifiedCount
};

// -------------------- *** -------------------- 

async function signToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await User.findById(userId);
        if (!user) reject({ status: 400, message: 'There is no user' })
        const { phone } = user;
        let token = await sign({ phone }, process.env.JSON_WEBTOKEN_SECURECODE, { expiresIn: '60d' });
        resolve(token);
    })

}


async function signRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await User.findById(userId);
        if (!user) reject({ status: 400, message: 'There is no user' })
        const { phone } = user;
        let token = await sign({ phone }, process.env.JSON_WEBTOKEN_SECURECODE, { expiresIn: '365d' });
        await redisClient.setEx(user.id, 31536000, token);
        resolve(token);
    });
}

// async function signRefreshToken(phone) {
//     let token = sign({ phone }, process.env.REFRESH_WEBTOKEN_SECURECODE, { expiresIn: '365d' });
//     return token;
// }


// -------------------- *** -------------------- 

// -------------------- *** -------------------- 
// -------------------- *** -------------------- 
// -------------------- *** -------------------- 
// -------------------- *** -------------------- 




module.exports = {
    randomNumber,
    saveUser,
    signToken,
    signRefreshToken
};