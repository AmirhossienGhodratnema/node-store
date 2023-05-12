const router = require('express').Router();
const { hashPassword } = require('../../controller/api/developer/developerController');

// Controller


// Validation



router.post('/hash-password/:password', hashPassword);



module.exports = { developerRoute: router }