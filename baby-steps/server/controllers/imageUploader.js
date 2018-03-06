var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: process.env.IMAGE_UPLOAD_NAME, 
  api_key: process.env.IMAGE_API_KEY, 
  api_secret: process.env.IMAGE_API_SECRET
});

const uploadImage = function(imageData, cb) {
  cloudinary.uploader.upload(imageData, function(result) { 
    cb(result);
    console.log(result);
  });
}

module.exports = uploadImage;