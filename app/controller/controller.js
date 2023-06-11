const autoBind = require('auto-bind');
const { validationResult, param } = require('express-validator');


module.exports = class Controller {
    constructor() {
        autoBind(this);
    };

    // Validation of received information
    async validationData(req) {
        const result = validationResult(req);    // Get errors.
        if (!result.isEmpty()) {
            const errors = result.array();    // Get error in array.
            const msg = [];
            errors.forEach(item => {
                let test = {}
                test[item.param] = item.msg
                msg.push(test)
            });
            return msg;
        }
    };
};


