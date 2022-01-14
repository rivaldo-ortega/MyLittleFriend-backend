const VeterinaryServices = require('../services/veterinary.services');
const { validationResult } = require('express-validator');

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
    try {
      const newVeterinary = await VeterinaryServices.register({ name, detail, location, services });
      console.log('newVeterinary',newVeterinary);
      res.status(201).json({
          message: 'The veterinary was successfully registered',
          status: 'OK',
          data: {}
      });
    } catch (err) {
      res.status(503).json({
          message: 'The veterinary could not be registered. Please try again.',
          status: 'Failed',
          data: err
      });
    }
  }
}

module.exports = { registerVeterinary };
