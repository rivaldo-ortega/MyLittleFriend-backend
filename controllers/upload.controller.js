const fs = require('fs');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'mylittlefriend',
  api_key: '921586825242116',
  api_secret: 'fhePlpPiSWjR2W5ePmltpWk0UcI',
});

function uploadHandler(req, res) {
  const { files } = req;
  const response = [];

  for (const singleFile in files) {
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
  uploadHandler,
};
