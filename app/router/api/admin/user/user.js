const router = require('express').Router();


// Controller
const UserController = require('../../../../controller/api/admin/user/userController');


router.get('/getAll', UserController.index);
router.patch('/updateProfile', UserController.userUpdate);



module.exports = { user: router }