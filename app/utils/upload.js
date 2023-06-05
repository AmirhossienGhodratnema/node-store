const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { connection } = require('mongoose');

function createPath(req) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    let dir = path.join(__dirname, '..', '..', 'public', 'uploads', year + '', month + '', day + '');
    req.body.fileUploadPath = path.join('uploads', year + '', month + '', day + '')
    fs.mkdirSync(dir, { recursive: true });
    return dir;
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath = createPath(req);
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const fileName = String(new Date().getTime() + ext);
        req.body.filename = fileName;
        cb(null, fileName);
    }
});

function fileFilter(req, file, cb) {
    const mimType = ['.png', '.jpg', '.gif', '.jpeg', '.webp'];
    const ext = path.extname(file.originalname);
    if (mimType.includes(ext)) {
        return cb(null, true)
    }
    cb(new Error('Invalid IMAGE Type'))
}


const maxSize = 1 * 1000 * 1000
const uploadFile = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize },
});

module.exports = {
    uploadFile
}