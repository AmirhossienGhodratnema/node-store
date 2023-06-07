const fs = require('fs');
const path = require('path');
const validator = require('validator');


const unlinkPhoto = async (fileUploadPath, filename) => {
    const file = path.join(__dirname, '..', 'public', fileUploadPath, filename);
    fs.unlinkSync(file);
};

const filesUpload = async (files, body) => {    // Return the address of several photos
    const { filename, fileUploadPath } = body;
    return files.map(file => path.join(fileUploadPath, filename).replace(/\\/gi, '/'))
};


async function checkMongoId(id) {
    if (!validator.isMongoId(id)) {
        throw { status: 400, message: 'MongoID is wrong' };
    }
}

module.exports = {
    unlinkPhoto,
    filesUpload,
    checkMongoId
}