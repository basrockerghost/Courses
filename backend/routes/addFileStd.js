const express = require('express');
const user = express()
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

user.use(bodyParser.urlencoded({ extended: true }));
user.use(express.static(path.resolve(__dirname, 'public')));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage });

const uploadfile = require('../controller/upload')

user.post('/students', upload.single('file'),uploadfile.uploadFile);

module.exports = user;