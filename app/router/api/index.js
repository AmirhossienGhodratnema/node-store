const router = require('express').Router();


// Controller
const HomeController = require('../../controller/api/homeController/homeContrtoller')

// Routers
const { userRouters } = require('./user/userRoute');
const { indexPage } = require('./indexPage/indexPage');
const { verifyToken } = require('../../middleware/verifytoken');

router.use('/', indexPage);
router.use('/user', userRouters);

router.use('/test', verifyToken, (req, res, next) => {
    return res.json('Token is ok');
});


module.exports = {
    homeRoute: router
};