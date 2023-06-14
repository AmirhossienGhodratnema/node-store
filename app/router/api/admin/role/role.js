const router = require('express').Router();


// Controller
const RoleController = require('../../../../controller/api/admin/RGAB/roleController');




router.post('/', RoleController.create);


module.exports = {
    role: router,
}