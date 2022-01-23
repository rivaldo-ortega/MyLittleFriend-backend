const express = require('express');
const { registerVeterinary } = require('../controllers/veterinary.controller');
const { body } = require('express-validator')
const passport = require('passport');
const validateJWT = passport.authenticate('jwt', { session:false, failWithError: true });

const router = express.Router();

/**
 * GET
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        data: 'Veterinaries list',
        message: 'OK'
    });
});

/**
 * GET
 */
router.post(
    '/',
    validateJWT,
    body('name').notEmpty(),
    body('detail').optional({ checkFalsy: true }).isString(),
    body('location').notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    body('services').isArray(),
    registerVeterinary
);

module.exports = router;
