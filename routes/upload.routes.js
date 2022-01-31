const express = require('express');
const router = express.Router();
const {
  uploadSigleHandler,
  uploadMultipleHandler,
} = require('../controllers/upload.controller');
const multer = require('multer');

const upload = multer({
  dest: 'temp',
});

router.post('/file', upload.single('image'), uploadSigleHandler);
router.post('/files', upload.array('image'), uploadMultipleHandler);
module.exports = router;
