const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerPet, findPet, deletePet, updatePet } = require('../controllers/pet.controller');
const { getHistoryByPet } = require('../controllers/attendace.controller')
const passport = require('passport');
const validateJWT = passport.authenticate('jwt', { session:false, failWithError: true });

/**
 * GET
 */
router.get(
    '/:petId', 
    validateJWT,
    findPet
);
router.get(
    '/:petId/history',
    validateJWT,
    getHistoryByPet
);

/**
 * POST
 */
router.post(
    '/',
    validateJWT,
    body('name').isString().notEmpty(),
    body('detail').optional({ checkFalsy: true }).isString(),
    body('birthdate', 'Invalid date of birth').toDate(),
    body('type').isString().notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    body('owner').isString().notEmpty(),
    registerPet
);

/**
 * PUT
 */
router.put(
    '/:petId',
    validateJWT,
    body('detail').optional({ checkFalsy: true }).isString(),
    body('birthdate', 'Invalid date of birth').toDate(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    updatePet
);

/**
 * DELETE
 */
router.delete(
    '/:petId',
    validateJWT,
    deletePet
);


module.exports = router;
