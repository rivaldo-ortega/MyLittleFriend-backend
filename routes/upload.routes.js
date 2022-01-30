const express = require('express');
const router = express.Router();
const { uploadHandler } = require('');
const multer = require('multer');

const upload = multer({
  dest: '.temp',
});

router.post('/file', upload.array('image'), uploadHandler);
