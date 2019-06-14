const path = require('path');
const multer = require('multer');
const Datauri = require('datauri');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const multerUploads = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
    onError: function (err, next) {
        if (err) {
            const err = new Error('File Upload exception');
            err.httpStatusCode = 500;
            next(err);
        }
    }
})

const dUri = new Datauri();

const dataUri = (req) => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = { multerUploads, dataUri }