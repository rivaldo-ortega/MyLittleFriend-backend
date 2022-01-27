const VeterinaryServices = require('../services/veterinary.services');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');
const ErrorHttp = require('../middlewares/httpError.middleware');

const registerVeterinary = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      next(errors)
  } else {
    const { name, detail, location, services } = req.body;
    const newVeterinary = await VeterinaryServices.register({ name, detail, location, services });
    if(!newVeterinary.errors){
      throw new ErrorHttp('The veterinary was successfully registered', 201)
    } else {
      throw new Error(errors)
    }
  }
})

module.exports = { registerVeterinary };
