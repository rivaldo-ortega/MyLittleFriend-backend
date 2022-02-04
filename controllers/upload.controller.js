const fs = require('fs');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});
async function uploadSigleHandler(req, res) {
  const { file, body } = req;
  console.log('files', file);
  const response = [];

  try {
    const result = await cloudinary.uploader.upload(file.path);
    console.log(result);
    response.push(result);
  } catch (e) {
    res.status(500).json(e);
  } finally {
    fs.unlinkSync(file.path);
  }

  res.status(200).json({
    msg: 'success upload',
    response,
  });
}

async function uploadMultipleHandler(req, res) {
  const { files, body } = req;
  const response = [];

  for (const singleFile of files) {
    try {
      const result = await cloudinary.uploader.upload(singleFile.path);
      response.push(result);
    } catch (e) {
      res.status(500).json(e);
    } finally {
      fs.unlinkSync(singleFile.path);
    }
  }
  res.status(200).json({
    msg: 'success upload',
    response,
  });
}
module.exports = {
  uploadSigleHandler,
  uploadMultipleHandler,
};
