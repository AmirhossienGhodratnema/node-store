const fs = require('fs');
const path = require('path');

const unlinkPhoto = async (fileUploadPath, filename) => {
    const file = path.join(__dirname, '..', 'public', fileUploadPath, filename);
    fs.unlinkSync(file);
};

const filesUpload = async (files, body) => {    // Return the address of several photos
    const { filename, fileUploadPath } = body;
    return files.map(file => path.join(fileUploadPath, filename).replace(/\\/gi, '/'))
};


module.exports = {
    unlinkPhoto,
    filesUpload
}