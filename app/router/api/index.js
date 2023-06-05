const router = require('express').Router();


// Controller
const HomeController = require('../../controller/api/homeController/homeContrtoller')

// Routers
const { userRouters } = require('./user/userRoute');
const { developerRoute } = require('./developer');
const { AdminRouter } = require('./admin/admin');

const { indexPage } = require('./indexPage/indexPage');
const { verifyToken } = require('../../middleware/verifytoken');

router.use('/', indexPage);
router.use('/user', userRouters);
router.use('/admin', verifyToken, AdminRouter);



router.use('/developer', developerRoute);





module.exports = {
    homeRoute: router
};