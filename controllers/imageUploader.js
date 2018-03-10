var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: process.env.IMAGE_UPLOAD_NAME, 
  api_key: process.env.IMAGE_API_KEY, 
  api_secret: process.env.IMAGE_API_SECRET
});

const uploadImage = function(imageData, cb) {
  cloudinary.v2.uploader.upload_stream({resource_type: 'raw'}, function(error, result) {
    console.log(error);
    console.log(result);
    cb(result);
    }).end(imageData.data);
}

module.exports = uploadImage;