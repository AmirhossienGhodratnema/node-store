const router = require('express').Router();


// Controller
const PermissionController = require('../../../../controller/api/admin/RGAB/permissionController');

// Validation
const { create } = require('./.../../../../../../validation/admin/permissionValidation')

router.get('/', PermissionController.index);
router.post('/create', create(), PermissionController.create);
router.post('/remove/:id', PermissionController.remove);


module.exports = {
    permission: router,
}