const router = require('express').Router();


// Controller
const HomeController = require('../../controller/api/homeController/homeContrtoller')


// Validation
const { registerValidation } = require('./../../validation/validation')

router.post('/', registerValidation(), HomeController.indexPage);    // Home page controller

module.exports = {
    homeRoute: router
};