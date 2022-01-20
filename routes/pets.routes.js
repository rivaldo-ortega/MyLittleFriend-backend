const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerPet, findPet, deletePet, updatePet } = require('../controllers/pet.controller');
const { getHistoryByPet } = require('../controllers/attendace.controller')

/**
 * GET
 */
router.get('/:petId', findPet);
router.get('/:petId/history', getHistoryByPet);

/**
 * POST
 */
router.post('/',
    body('name').isString().notEmpty(),
    body('detail').optional({ checkFalsy: true }).isString(),
    body('birthdate', 'Invalid date of birth').toDate(),
    body('type').isString().notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    body('owner').isString().notEmpty(),
    registerPet
)

/**
 * PUT
 */
router.put('/:petId',
    body('name').isString().notEmpty(),
    body('detail').optional({ checkFalsy: true }).isString(),
    body('birthdate', 'Invalid date of birth').toDate(),
    body('type').isString().notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    updatePet
)

/**
 * DELETE
 */
router.delete('/',
    body('id').isString().notEmpty(),
    deletePet
)


module.exports = router;
