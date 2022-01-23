const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerRequestService, listRequestsService, findRequestService } = require('../controllers/requestservice.controller');
const passport = require('passport');
const validateJWT = passport.authenticate('jwt', { session:false, failWithError: true });

/**
 * GET
 */
router.get(
    '/',
    validateJWT,
    listRequestsService
);
router.get(
    '/:requestId',
    validateJWT,
    findRequestService
);

/**
 * POST
 */
router.post(
    '/',
    validateJWT,
    body('service').isString().notEmpty(),
    body('price').isFloat().notEmpty(),
    body('veterinary').isString().notEmpty(),
    body('pet').isString().notEmpty(),
    body('date').toDate(),
    registerRequestService
);

module.exports = router;
