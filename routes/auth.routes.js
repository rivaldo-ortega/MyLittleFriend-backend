const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport');

const { loginCustomer } = require('../controllers/auth.controller');
const { verifyAccount } = require('../controllers/auth.controller');

router.post('/login',
    body('email').isEmail().normalizeEmail(),
    body('password', 'The password must be between 6 and 20 characters long').isLength({ min: 6, max: 20 }),
    passport.authenticate('local', { session: false, failWithError: true }),
    loginCustomer
)

router.post('/verify-email',
    verifyAccount
)

module.exports = router;
