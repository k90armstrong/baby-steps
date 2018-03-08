var request = require('request');
var FormData = require('form-data');
var fs = require('fs');
var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var app = express();
app.use(bodyParser.json());

// documentation about the endpoint can be found at https://developers.canvaspop.com/documentation/endpoints
// Canvas pop API variables start
var canvasEndpoint = "https://store.canvaspop.com";
var pushEndPoint = canvasEndpoint + "/api/push/image";
var loaderEndPoint = canvasEndpoint + "/loader/";
// Canvas pop API variables end

// Multer variables - start
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
}).array('userPhoto', 8);
// Multer variables - end

// Multi file upload endpoint - start
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo', function(req, res) {
  upload(req, res, function(err) {
    console.log(req.body);
    console.log(req.files);
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});
// Multi file upload endpoint - end

// Photo print upload endpoint will return the endpoint for photo print.
// Front end should use this URL and open in a new frame
app.post('/api/photoPrint', function(req, res) {
  console.log("photoPrint API call start");
  console.log(req.body.fileName);
  doPush(req, function(responsePush) {
    var url = loaderEndPoint + imageToken;
    res.send(url);
  });
});

app.listen(3000, function() {
  console.log("Working on port 3000");
});
/*
 *API call /api/push/image endpoint and receive an image_token value
 */
var doPush = function(req, callback) {
    var formData = generateFormData(req.body.fileName),
      headers = generateHeader();
    console.log("Calling Push API");
    post(pushEndPoint, headers, formData, function(response) {
      console.log("response " + response);
      var obj = JSON.parse(response);
      imageToken = obj.image_token
      console.log("imageToken from Push API call" + imageToken);
      callback(imageToken);
    });
  },
  generateHeader = function() {
    return {
      'Content-Type': 'image/jpeg',
      'CP-Authorization': 'basic',
      // Change this when API key is changed.
      'CP-ApiKey': '0e524556d32c94abbef0d0b058c58a1c'
    };
  },
  generateFormData = function(imagePath) {
    var iPath = imagePath,
      staticBasePath = "./uploads/",
      fileLoc = path.resolve(__dirname, staticBasePath, iPath);
    console.log("fileLoc" + fileLoc);
    return {
      'image': fs.createReadStream(fileLoc)
    };
  },
  post = function(url, headers, data, callback) {
    var options = {
      method: 'POST',
      url: url,
      headers: headers,
      formData: data
    };
    request(options, function(err, response, body) {
      callback(body);
    });
  };