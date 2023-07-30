const router = require('express').Router();

const { verifyToken } = require('../../../middleware/verifytoken');
const PaymentController = require('./../../../controller/api/homeController/paymentController');

/**
 * @swagger
 * tags:
 *      name: IndexPage
 *      description : Index route and data
 */

/**
 * @swagger
 * /api/v1:
 *   get:
 *     summery: Index of routes
 *     tags: [IndexPage] 
 *     description: Get all need data for index page.
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description : not found
 */
router.get('/', (req, res, next) => {
    return res.json('Main page');
});

router.post('/payment',verifyToken, PaymentController.payment)
router.get('/verify', PaymentController.verify)


module.exports = { indexPage: router }