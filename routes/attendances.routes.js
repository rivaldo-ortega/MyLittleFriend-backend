const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator')
const { registerAttendace } = require('../controllers/attendace.controller');

router.get('/', (req, res, next) => {
    res.status(200).json({
        data: 'Attendances list',
        message: 'OK'
    });
});

router.post('/',
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
