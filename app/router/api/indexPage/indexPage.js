const router = require('express').Router();



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



module.exports = { indexPage: router }