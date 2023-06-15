let ConnectRoles = require('connect-roles');
const { Permission } = require('../models/permission');
const { StatusCodes } = require('http-status-codes');
const { Category } = require('../models/categorys');
const { Role } = require('../models/role');
const { User } = require('../models/user');
const testSS = require('./../models/user')
const permission = require('../models/permission');

let gate = new ConnectRoles({
    failureHandler: function (req, res, action) {
        // optional function to customise code that runs when
        // user fails authorisation


        throw { status: StatusCodes.FORBIDDEN, message: 'You do not have access' }

        // var accept = req.headers.accept || '';
        // res.status(403);
        // console.log(accept)
        // // return res.json(action)
        // if (accept.indexOf('html')) {
        //     res.send({ action: action, title: 'اجازه دسترسی ندارید' });
        // } else {
        //     // return res.json('kjahsdfkjahsdf')

        //     res.send('Access Denied - You don\'t have permission to: ' + action);
        // }
    }
});





// gate.use(function (req, action) {
//     return true;
//     if (req.user) return action === 'access home page';
// })

// gate.use(function (req, action) {

//     return (Role.findOne({ title: req.user.role.title }).populate({ path: 'permissions' })
//         .then(role => {
//             const rolesTitle = role.permissions.map(item => item.title);
//             const result = rolesTitle.includes(action);
//             return true
//         }))


// if (test) return true


// const role = await Role.findOne({ title: req.user.role.title }).populate({ path: 'permissions' });
// // if (role == null) return false;
// const permissionTitleArray = role.permissions.map(item => item.title);
// const result = permissionTitleArray.includes(action);
// console.log('result', result);
// if (result == true) return true;

// })





const permissions = async () => {
    const roles = await Role.find({}).populate({ path: 'permissions' })
    return roles;
}

permissions()
    .then(roles => {
        roles.forEach(role => {
            gate.use(function (req, action) {
                const permissions = req.user.role.permissions;
                const titleArr = permissions.map(item => item.title);
                console.log(titleArr)
                if (titleArr.includes(action)) return true
            })

        })
    })



// permissions()
//     .then(permissions => {

//         permissions.forEach(permission => {
//             let roles = permission.roles.map(item => item.id);
//             gate.use(permission.name, (req) => {
//                 let auth = req.isAuthenticated()
//                 return auth ? req.user.hasRoles(roles) : false;
//             })

//         })
//     })


module.exports = gate
