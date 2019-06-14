const cloudinary = require('cloudinary');

const cloudinaryConfig = (req, res, next) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
    } catch (err) {
        next(err);
    }
    next()
}

const uploader = cloudinary.v2.uploader;
module.exports = { cloudinaryConfig, uploader }


