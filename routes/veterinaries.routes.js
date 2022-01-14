const express = require('express');
const { registerVeterinary } = require('../controllers/veterinary.controller');
const { body } = require('express-validator')

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        data: 'Veterinaries list',
        message: 'OK'
    });
});

router.post('/',
    body('name').notEmpty(),
    body('detail').optional({ checkFalsy: true }).isString(),
    body('location').notEmpty(),
    body('avatar_url').optional({ checkFalsy: true }).isString(),
    body('services').isArray(),
    registerVeterinary
);

module.exports = router;
