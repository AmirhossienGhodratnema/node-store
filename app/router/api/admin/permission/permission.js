const router = require('express').Router();


// Controller
const PermissionController = require('../../../../controller/api/admin/RGAB/permissionController');




router.post('/', PermissionController.create);


module.exports = {
    permission: router,
}