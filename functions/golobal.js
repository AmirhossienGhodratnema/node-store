const fs = require('fs');
const path = require('path');

const unlinkPhoto = async (fileUploadPath, filename) => {
    const file = path.join(__dirname, '..', 'public',fileUploadPath,filename );
    fs.unlinkSync(file);
};


module.exports = { unlinkPhoto }