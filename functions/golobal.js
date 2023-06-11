const { validationResult } = require('express-validator');
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');
const path = require('path');
const validator = require('validator');


const unlinkPhoto = async (fileUploadPath, filename) => {
    const file = path.join(__dirname, '..', 'public', fileUploadPath, filename);
    fs.unlinkSync(file);
};

const filesUpload = async (files, body) => {    // Return the address of several photos
    const { fileUploadPath, filename } = body;
    return files.map(file => path.join(fileUploadPath, filename).replace(/\\/gi, '/'))
};

const fileUploadSingle = async (body) => {
    const { fileUploadPath, filename } = body;
    return path.join(fileUploadPath, filename).replace(/\\/gi, '/');
}


async function checkMongoId(id) {
    if (!validator.isMongoId(id)) {
        throw { status: 400, message: 'MongoID is wrong' };
    }
}

async function createError(statusCode, message) {
    throw { status: statusCode, message: message };
}



async function validationData(req) {
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

async function ValidationData(req) {
    const checkingBody = await validationData(req);    // Data validation.
    if (checkingBody) throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: checkingBody };    // Data error validation.
}

module.exports = {
    unlinkPhoto,
    filesUpload,
    checkMongoId,
    fileUploadSingle,
    createError,
    ValidationData
}