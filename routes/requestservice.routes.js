const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerRequestService, listRequestsService, findRequestService } = require('../controllers/requestservice.controller');

router.get('/', listRequestsService);

router.get('/:requestId', findRequestService);

router.post('/',
    body('service').isString().notEmpty(),
    body('price').isFloat().notEmpty(),
    body('veterinary').isString().notEmpty(),
    body('pet').isString().notEmpty(),
    body('date').toDate(),
    registerRequestService
)

module.exports = router;
