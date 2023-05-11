const { check } = require('express-validator');
const { User } = require('../models/user');

// const registerValidation = () => {
//     return [
//         check('firstName')
//             .notEmpty().withMessage('Required firstName')
//             .isLength({ min: 3, max: 25 }).withMessage('Between 3 and 25 characters'),

//         check('lastName')
//             .notEmpty().withMessage('Required firstName')
//             .isLength({ min: 3, max: 25 }).withMessage('Between 3 and 25 characters'),

//         check('userName')
//             .notEmpty().withMessage('Required userName')
//             .isAlphanumeric().withMessage('English letters and numbers')
//             .custom(async (value, { req }) => {
//                 const user = await User.findOne({ userName: value });
//                 if (user) throw new Error('Duplicate username');
//                 return true
//             }),


//         check('phoneNumber')
//             .notEmpty().withMessage('Required phoneNumber')
//             .isMobilePhone().withMessage('Wrong format: ex => 09170000000')
//             .isLength({ min: 11, max: 11 }).withMessage('11 characters')
//             .custom(async (value, { req }) => {
//                 const user = await User.findOne({ phoneNumber: value });
//                 if (user) throw new Error('Duplicate phoneNumber');
//                 return true
//             }),

//         check('email')
//             .notEmpty().withMessage('Required email')
//             .isEmail().withMessage('Wrong format')
//             .custom(async (value, { req }) => {
//                 const user = await User.findOne({ email: value });
//                 if (user) throw new Error('Duplicate email');
//                 return true
//             }),


//         check('password')
//             .notEmpty().withMessage('Required password'),

//         check('confirmPassword')
//             .custom((value, { req }) => {
//                 const { password } = req.body;
//                 if (value !== password) {
//                     throw new Error('Password confirmation does not match password');
//                 }
//                 return true;
//             }),
//     ];
// };



const getOtpValidation = () => {
    return [
        check('phone')
            .isLength({ min: 11, max: 11 }).withMessage('Mobile number must be 11 digits')
    ]
};


const checkOtpValidation = () => {
    return [
        check('phone')
            .isLength({ min: 11, max: 11 }).withMessage('Mobile number must be 11 digits'),

        check('code')
            .notEmpty().withMessage('Validation code is required')
    ]
}




module.exports = {
    getOtpValidation,
    checkOtpValidation
};