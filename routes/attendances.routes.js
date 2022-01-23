const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator')
const { registerAttendace } = require('../controllers/attendace.controller');
const passport = require('passport');
const validateJWT = passport.authenticate('jwt', { session:false, failWithError: true });

/**
 * GET
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        data: 'Attendances list',
        message: 'OK'
    });
});

/**
 * POST
 */
router.post(
    '/',
    validateJWT,
    body('date').isDate(),
    body('veterinary').notEmpty(),
    body('pet').notEmpty(),
    body('attendance_detail').notEmpty(),
    body('recipe').isArray(),
        check('recipe.*.name').notEmpty(),
        check('recipe.*.detail').notEmpty(),
    registerAttendace
);

module.exports = router;
