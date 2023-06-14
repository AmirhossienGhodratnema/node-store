const router = require('express').Router();


// Controller
const RoleController = require('../../../../controller/api/admin/RGAB/roleController');




router.get('/', RoleController.create);


module.exports = {
    role: router,
}