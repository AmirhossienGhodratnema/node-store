const { validationResult } = require('express-validator');
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');
const moment = require('jalali-moment');
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

async function checkMongoIdGraphQl(id) {
if (!validator.isMongoId(id)) throw new Error('MongoID is wrong');
};

async function createError(statusCode, message) {
    throw { status: statusCode, message: message };
}

async function createErrorGraphQl(message) {
    throw new Error(message);
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



async function deleteInvalidPropertyInObject(data = {}, blockList = [], main = []) {
    let illegal = ['', ' ', '0', 0, -1, null, undefined];
    Object.keys(data).forEach((key) => {    // Object navigation to check specific items !!!
        if (blockList.includes(key)) delete data[key];    // Deletes the fields that are in the block list.
        if (!main.includes(key)) delete data[key];
        if (typeof data[key] == 'string') data[key] = data[key].trim();    // Trim the value of each field.
        if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());    // Validating presentation indexes in fields that are presentations.
        if (illegal.includes(key)) delete data[key];    // Removes unauthorized fields.
    });
}

async function ValidationData(req) {
    const checkingBody = await validationData(req);    // Data validation.
    if (checkingBody) throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: checkingBody };    // Data error validation.
};

async function uniqueTitle(model) {
    // let result = await data.replace(' ', '#');    // Replace ' ' with '#' for check unieq title. 
    model.chapters.map(item => {    // Push title in chaptersList.
        // chaptersList.push(chapter.title)
    });

};


async function getTimeOfCourse(chapters = []) {
    let time, hour, minute, second = 0;
    for (const chapter of chapters) {
        if (Array.isArray(chapter?.episodes)) {
            for (const episode of chapter.episodes) {
                if (episode?.time) time = episode.time.split(":") // [hour, min, second]
                else time = "00:00:00".split(":")
                if (time.length == 3) {
                    second += Number(time[0]) * 3600 // convert hour to second
                    second += Number(time[1]) * 60 // convert minute to second
                    second += Number(time[2]) //sum second with seond
                } else if (time.length == 2) { //05:23
                    second += Number(time[0]) * 60 // convert minute to second
                    second += Number(time[1]) //sum second with seond
                }
            }
        }
    }
    hour = Math.floor(second / 3600); //convert second to hour
    minute = Math.floor(second / 60) % 60; //convert second to mintutes
    second = Math.floor(second % 60); //convert seconds to second
    if (String(hour).length == 1) hour = `0${hour}`
    if (String(minute).length == 1) minute = `0${minute}`
    if (String(second).length == 1) second = `0${second}`
    return (hour + ":" + minute + ":" + second)
}

async function invoiceNumberGenerator() {
    return moment().format('jYYYYjMMjDDHHmmssSSS') + String()
}

module.exports = {
    unlinkPhoto,
    filesUpload,
    checkMongoId,
    fileUploadSingle,
    createError,
    ValidationData,
    deleteInvalidPropertyInObject,
    uniqueTitle,
    getTimeOfCourse,
    checkMongoIdGraphQl,
    createErrorGraphQl,
    invoiceNumberGenerator
};