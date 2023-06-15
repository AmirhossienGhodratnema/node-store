const router = require('express').Router();


// Controller
const PermissionController = require('../../../../controller/api/admin/RGAB/permissionController');

// Validation
const { create, edit } = require('./.../../../../../../validation/admin/permissionValidation')

router.get('/', PermissionController.index);
router.post('/create', create(), PermissionController.create);

router.patch('/edit/:id', edit(), PermissionController.edit);

router.delete('/remove/:id', PermissionController.remove);


module.exports = {
    permission: router,
}