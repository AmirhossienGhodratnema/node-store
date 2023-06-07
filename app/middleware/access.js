
const chckRole = (role) => {    // A function that takes the roll value and returns a function to continue.
    return function (req, res, next) {
        try {
            const user = req.user;    // Getting the user to receive and check the roll.
            if (user.rols.includes(role)) return next();    // Go on
            throw { status: 400, message: 'You do not have access to this address' };    // Address access restriction error
        } catch (error) {
            next(error);
        };
    };
};


module.exports = {
    chckRole
}