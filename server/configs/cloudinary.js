const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer'); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.CLOUDINARYKEY,
  api_secret: process.env.CLOUDINARYSECRET
})
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'example-blah-folder', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const parser = multer({ storage: storage });


module.exports = parser;