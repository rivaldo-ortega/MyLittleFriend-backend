const { validationResult } = require('express-validator');

const handlerError =  (error, req, res, next) => {
  const validation = validationResult(req);
  if (validation.errors.length) {
    return res.status(403).json({
      message: validation.errors,
      status: 'Failed',
      data: {}
    })
  }
    res.status(error.code || 503).json({
      message: error.message || 'Internal error. Please, try again.',
      status: 'Failed',
      data: {}
    });
};

module.exports = handlerError;
