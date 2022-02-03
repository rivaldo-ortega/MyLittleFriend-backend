const attendanceService = require('../services/attendace.services');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const registerAttendace = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errors)
    }

    const attendaceJson = {...req.body};
    const petId = req.body.pet;

    const newAttendance = await attendanceService.register(attendaceJson, petId);
        res.status(200).json({
            message: 'The attendance was successfully registered.',
            status: 'OK',
            data: newAttendance
        });
});

const getHistoryByPet = asyncHandler(async(req, res, next) => {
    const petId = req.params.petId;

    const history = await attendanceService.findByPet(petId);
        res.status(200).json({
            message: 'The history was successfully list.',
            status: 'OK',
            data: history
        });
})

module.exports = { registerAttendace, getHistoryByPet }
