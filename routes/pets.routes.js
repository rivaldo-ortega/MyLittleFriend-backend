const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerPet } = require('../controllers/pet.controller');

router.post('/',
    body('name').notEmpty().isString(),
    body('detail').optional({ checkFalsy: true }).isString(),
    body('birthdate', 'Invalid date of birth').toDate(),
    body('type').notEmpty().isString(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    body('owner').isString().notEmpty(),
    registerPet
)

module.exports = router;
