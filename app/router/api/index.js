const router = require('express').Router();


// Controller
const HomeController = require('../../controller/api/homeController/homeContrtoller')

// Routers
const { userRouters } = require('./user/userRoute');
const { indexPage } = require('./indexPage/indexPage');

router.use('/', indexPage)
router.use('/user', userRouters)


module.exports = {
    homeRoute: router
};