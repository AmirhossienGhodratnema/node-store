const router = require('express').Router();


// Controller
const RoleController = require('../../../../controller/api/admin/RGAB/roleController');

// Validation
const { create } = require('./../../../../validation/admin/roleValidation');


router.get('/getList', RoleController.getList);
router.post('/create', create(), RoleController.create);


module.exports = {
    role: router,
}