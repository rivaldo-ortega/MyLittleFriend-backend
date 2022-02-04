const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const { signUpCustomer, findPaymentDataById, findCustomer } = require('../controllers/customer.controller');
const { findPetsByOwner } = require('../controllers/pet.controller');
const passport = require('passport');
const validateJWT = passport.authenticate('jwt', { session:false, failWithError: true });

/**
 * GET
 */
router.get(
    '/:customerId',
    validateJWT,
    findCustomer
);
router.get(
    '/:customerId/pets',
    validateJWT,
    findPetsByOwner
);
router.get(
    '/:customerId/paymentdata',
    validateJWT,
    findPaymentDataById
);

/**
 * POST
 */
router.post(
    '/',
    body('full_name').notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('password', 'The password must be between 6 and 20 characters long').isLength({ min: 6, max: 20 }),
    body('address').notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    signUpCustomer
);

module.exports = router;
