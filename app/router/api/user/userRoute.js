const router = require('express').Router();

// Controller
const AuthController = require('./../../../controller/api/user/authController')


// Validation
const getOtpValidation = require('./../../../validation/authValidation');

/**
 * @swagger
 * tags:
 *      name: User autorization
 *      description : User router and data needs
 */

/**
 * @swagger
 * /api/v1/user/get-otp:
 *   post:
 *     summery: Loing user in userpanel with phone number
 *     tags: [User autorization] 
 *     description: One time password(otp) login
 *     parameters:
 *          -   name: phone
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: String    
 *          
 *     responses:
 *       201:
 *         description: Create one record in DB => success
 *       400:
 *         description : Bad request
 *       401:
 *         description: Unauthorization
 *       500:
 *         description: Internal server error
 */


router.post('/get-otp', getOtpValidation.getOtpValidation(), AuthController.getOtp);
router.post('/check-otp', getOtpValidation.checkOtpValidation(), AuthController.checkOtp);
router.post('/refresh-token', AuthController.refreshToken);



module.exports = { userRouters: router }