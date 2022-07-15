const express = require('express');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const cors = require('cors');
const multer  = require('multer');
const path = require('path');
const upload = require('./upload-file');

mongoose.connect('mongodb+srv://valk120:valk120@cluster1.ztfmuwe.mongodb.net/BD_Criss?retryWrites=true&w=majority', {useNewUrlParser: true});

const server = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions));

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.resolve('uploads'); 
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
const uploadMulter = multer({ storage: storage });

server.post('/upload-file', uploadMulter.single('file'), upload);

server.listen(8000, () => {
  console.log('Server started http://localhost:8000')
})