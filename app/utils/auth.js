const { User } = require('./../models/user');
const { sign } = require('jsonwebtoken');

// -------------------- *** -------------------- 

// Generate random code
async function randomNumber() {
    return Math.floor((Math.random() * 90000) + 10000)
};

// -------------------- *** -------------------- 

async function saveUser(phone, code) {
    const dateEXP = new Date().getTime() + 120000;
    console.log(dateEXP, new Date().getTime())
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
        rols: ['USER']
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

async function createToken(phone) {
    let token = sign({ phone }, process.env.JSON_WEBTOKEN_SECURECODE, { expiresIn: '365d' });
    return token;
}

// -------------------- *** -------------------- 

// -------------------- *** -------------------- 
// -------------------- *** -------------------- 
// -------------------- *** -------------------- 
// -------------------- *** -------------------- 




module.exports = {
    randomNumber,
    saveUser,
    createToken,
};