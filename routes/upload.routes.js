const express = require('express');
const router = express.Router();
const {
  uploadSingleHandler,
  uploadMultipleHandler,
} = require('../controllers/upload.controller');
const multer = require('multer');

const upload = multer({
  dest: 'temp',
});

router.post('/file', upload.single('image'), uploadSingleHandler);
router.post('/files', upload.array('image'), uploadMultipleHandler);
module.exports = router;
