const RequestServServices = require('../services/requestservice.services');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');
const ErrorHttp = require('../middlewares/httpError.middleware');

const listRequestsService = asyncHandler(async (req, res, next) => {
    
    const requestsService = await RequestServServices.listRequestsService();
    if(!requestsService.errors){
        throw new ErrorHttp('The services were successfully find.', 200);
    } else {
        throw new Error(errors)
    }
})

const findRequestService = asyncHandler(async (req, res, next) => {
    const { requestId } = req.params;

    const request = await RequestServServices.findRequestServiceById(requestId);
    if(request){
        throw new ErrorHttp('The service request was successfully find.', 200)
    } else {
        throw new Error(errors)
    }
})

const registerRequestService = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    }

    const requestServiceJson = { ...req.body };
    const veterinaryId = req.body.veterinary;
    const petId = req.body.pet;

    const requestService = await RequestServServices.register(requestServiceJson, veterinaryId, petId);
        if(!requestService.errors){
            throw new ErrorHttp('The request was successfully registered', 200)
        } else {
            throw new Error(errors)
        }
})

module.exports = { findRequestService, listRequestsService, registerRequestService };
