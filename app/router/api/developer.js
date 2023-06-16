const router = require('express').Router();
const { hashPassword } = require('../../controller/api/developer/developerController');




router.post('/hash-password/:password', hashPassword);



module.exports = { developerRoute: router }