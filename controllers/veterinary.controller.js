const VeterinaryServices = require('../services/veterinary.services');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const registerVeterinary = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      next(errors)
  } else {
    const { name, detail, location, services } = req.body;
    await VeterinaryServices.register({ name, detail, location, services });
      res.status(201).json({
        message: 'The veterinary was successfully registered',
        status: 'OK',
        data: {}
    });
  }
})

module.exports = { registerVeterinary };
