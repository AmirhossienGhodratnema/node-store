const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { connection } = require('mongoose');

function createPath(req) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    console
    let dir = path.join(__dirname, '..', 'public', 'uploads', year + '', month + '', day + '');
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
    cb(new Error('Invalid image type'))
}

function videoFilter(req, file, cb) {
    const mimType = ['.mp4', '.mpg', '.mov', '.avi', '.mkv'];
    const ext = path.extname(file.originalname);
    if (mimType.includes(ext)) {
        return cb(null, true)
    }
    cb(new Error('Invalid video type'))
}



const picSize = 1 * 1000 * 1000;
const videoSize = 200 * 1000 * 1000;

const uploadFile = multer({
    storage,
    fileFilter,
    limits: { fileSize: picSize },
});

const videoUpload = multer({
    storage,
    videoFilter,
    limits: { fileSize: videoSize },
});

module.exports = {
    uploadFile,
    videoUpload
}