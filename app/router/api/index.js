const router = require('express').Router();


// Controller
const HomeController = require('../../controller/api/homeController/homeContrtoller')


router.get('/', HomeController.indexPage);    // Home page controller

module.exports = {
    homeRoute: router
};