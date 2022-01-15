const RequestServServices = require('../services/requestservice.services');
const { validationResult } = require('express-validator');

const listRequestsService = async (req, res, next) => {
    try {
        const requestsService = await RequestServServices.listRequestsService();
        res.status(200).json({
            message: 'The services were successfully find.',
            status: 'OK',
            data: requestsService
        });
    } catch (err) {
        res.status(503).json({
            message: 'Error processing the request.',
            status: 'Failed',
            data: err
        });
    }
}

const findRequestService = async (req, res, next) => {
    const { requestId } = req.params;

    try {
        const request = await RequestServServices.findRequestServiceById(requestId);
        res.status(200).json({
            message: 'The service request was successfully find.',
            status: 'OK',
            data: request
        });
    } catch (err) {
        res.status(503).json({
            message: 'Error processing the request.',
            status: 'Failed',
            data: err
        });
    }
}

const registerRequestService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            message: errors,
            status: 'Failed',
            data: {}
        });
    }

    const requestServiceJson = { ...req.body };
    const veterinaryId = req.body.veterinary;
    const petId = req.body.pet;

    try {
        await RequestServServices.register(requestServiceJson, veterinaryId, petId);
        res.status(200).json({
            message: 'The request was successfully registered',
            status: 'OK',
            data: {}
        });

    } catch (err) {
        res.status(503).json({
            message: 'The pet could not be registered. Please try again.',
            status: 'Failed',
            data: err
        });
    }

}

module.exports = { findRequestService, listRequestsService, registerRequestService };
