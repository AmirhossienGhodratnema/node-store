const router = require('express').Router();

/**
 * @swagger
 * tags:
 *      name: User autorization
 *      description : User router and data needs
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summery: Loing user in userpanel with phone number
 *     tags: [User autorization] 
 *     description: One time password(otp) login
 *     parameters:
 *     -    name: Mobile
 *          description: fa-IRI phonenumber
 *          in: formData
 *          required: True
 *          type: String
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


router.post('/login', (req, res, next) => {
    return res.json('Login')
})



module.exports = { userRouters: router }