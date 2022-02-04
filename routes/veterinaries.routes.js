const express = require('express');
const { registerVeterinary, listVeterinaries, findVeterinary } = require('../controllers/veterinary.controller');
const { body } = require('express-validator')
const passport = require('passport');

const router = express.Router();

/**
 * GET
 */
router.get(
    '/',
    listVeterinaries
);
router.get(
    '/:veterinaryId',
    findVeterinary
);

/**
 * GET
 */
router.post(
    '/',
    body('name').notEmpty(),
    body('detail').optional({ checkFalsy: true }).isString(),
    body('location').notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    body('services').isArray(),
    registerVeterinary
);

module.exports = router;
