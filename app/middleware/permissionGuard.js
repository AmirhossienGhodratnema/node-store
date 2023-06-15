const { Permission } = require("../models/permission");
const { Role } = require("../models/role");
const { PERMISSIONS } = require("../utils/constans");


const checkRole = (requirePermission = []) => {    // A function that takes the roll value and returns a function to continue.
    return async function (req, res, next) {
        try {
            const user = req.user;    // Getting the user to receive and check the roll.
            const allPermission = requirePermission.flat(2);
            const role = await Role.findOne({ title: user.role });
            const permissions = await Permission.find({ '_id': { $in: role.permissions } });
            const userPermissions = permissions.map(item => item.title)

            const hasPermission = allPermission.every(permission => {
                return userPermissions.includes(permission)
            });

            console.log('allPermission', allPermission)
            console.log('userPermissions', userPermissions)

            console.log('test',userPermissions.includes(PERMISSIONS.ALL))

            if (userPermissions.includes(PERMISSIONS.ALL)) return next()
            if (hasPermission) return next();    // Go on
            throw { status: 400, message: 'You do not have access to this address' };    // Address access restriction error
        } catch (error) {
            next(error);
        };
    };
};


module.exports = { checkRole };