const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerPet, findPet, deletePet } = require('../controllers/pet.controller');

router.get('/:petId', findPet);

router.post('/',
    body('name').isString().notEmpty(),
    body('detail').optional({ checkFalsy: true }).isString(),
    body('birthdate', 'Invalid date of birth').toDate(),
    body('type').isString().notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    body('owner').isString().notEmpty(),
    registerPet
)

router.delete('/',
    body('id').isString().notEmpty(),
    deletePet
)


module.exports = router;
