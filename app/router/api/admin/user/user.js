const router = require('express').Router();

// Controller
const UserController = require('../../../../controller/api/admin/user/userController');
const { checkRole } = require('../../../../middleware/permissionGuard');
const { PERMISSIONS } = require('../../../../utils/constans');


router.get('/getAll', UserController.index);
router.patch('/updateProfile', UserController.userUpdate);
router.get('/test', UserController.test);


router.put('/addRole', UserController.addRole);



module.exports = { user: router }