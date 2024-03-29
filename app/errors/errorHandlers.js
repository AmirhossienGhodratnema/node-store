const createErrors = require('http-errors');



const notFoundError = (req, res, next) => {
    next(createErrors(404, 'The desired address was not found'));
    // return res.render('global/404')
    // return res.status(404).json({
    //     statusCode : 404,
    //     message : 'Not found error',
    //     success : false,
    // });
};


// All errors
const errorHandler = (err, req, res, next) => {
    const serverError = createErrors.InternalServerError(); ///Get server error
    const status = err.status || serverError.status;
    const message = err.message || serverError.message;
    return res.status(status).json({
        errors: {
            status,
            message,
            success: false
        }

    });
};


module.exports = {
    notFoundError,
    errorHandler,
}