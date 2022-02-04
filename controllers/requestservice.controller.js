const RequestServServices = require('../services/requestservice.services');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const listRequestsService = asyncHandler(async (req, res, next) => {

    const requestsService = await RequestServServices.listRequestsService();
    res.status(200).json({
        message: 'The services were successfully find.',
        status: 'OK',
        data: requestsService
    });
})

const findRequestService = asyncHandler(async (req, res, next) => {
    const { requestId } = req.params;

    const request = await RequestServServices.findRequestServiceById(requestId);
    res.status(200).json({
        message: 'The service request was successfully find.',
        status: 'OK',
        data: request
    });
})

const registerRequestService = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    }

    const requestServiceJson = { ...req.body };
    const veterinaryId = req.body.veterinary;
    const petId = req.body.pet;

    await RequestServServices.register(requestServiceJson, veterinaryId, petId);
    res.status(200).json({
        message: 'The request was successfully registered',
        status: 'OK',
        data: {}
    });
})

module.exports = { findRequestService, listRequestsService, registerRequestService };
