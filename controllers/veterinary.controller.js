const VeterinaryServices = require('../services/veterinary.services');
const { validationResult } = require('express-validator');
const veterinaryImage = `https://cdn.redcanina.es/wp-content/uploads/2019/03/26190114/baño-perro.jpg`

const registerVeterinary = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.status(403).json({
          message: errors,
          status: 'Failed',
          data: {}
      });
  } else {
    const { name, detail, location, services } = req.body;
    const avatar_url = req.body.avatar_url ? req.body.avatar_url : veterinaryImage;
    try {
      const newVeterinary = await VeterinaryServices.register({ name, detail, location, services, avatar_url });
      res.status(201).json({
          message: 'The veterinary was successfully registered',
          status: 'OK',
          data: {}
      });
    } catch (error) {
      res.status(503).json({
          message: 'The veterinary could not be registered. Please try again.',
          status: 'Failed',
          data: err
      });
    }
  }
}

const listVeterinaries = async (req, res, next) => {
  try {
    const veterinaries = await VeterinaryServices.get();
    res.status(200).json({
        message: 'The veterinaries was successfully listed',
        status: 'OK',
        data: veterinaries
    });
  } catch (error) {
    res.status(503).json({
        message: 'The veterinaries could not be listed. Please try again.',
        status: 'Failed',
        data: err
    });
  }
}

const findVeterinary = async (req, res, next) => {
  try {
    const veterinaryId = req.params.veterinaryId;
    const veterinary = await VeterinaryServices.getById(veterinaryId);
    res.status(200).json({
        message: 'The veterinary was successfully listed',
        status: 'OK',
        data: veterinary
    });
  } catch (error) {
    res.status(503).json({
        message: 'The veterinary could not be listed. Please try again.',
        status: 'Failed',
        data: err
    });
  }
}

module.exports = { registerVeterinary, listVeterinaries, findVeterinary };
