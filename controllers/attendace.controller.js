const attendanceService = require('../services/attendace.services');
const { validationResult } = require('express-validator');

const registerAttendace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            message: errors,
            status: 'Failed',
            data: {}
        });
    }

    const attendaceJson = {...req.body};
    const petId = req.body.pet;

    try {
        const newAttendance = await attendanceService.register(attendaceJson, petId);
        res.status(200).json({
            message: 'The attendance was successfully registered.',
            status: 'OK',
            data: newAttendance
        });
    } catch (err) {
        res.status(503).json({
            message: 'The attendace could not be registered. Please try again.',
            status: 'Failed',
            data: err
        });
    }
};

const getHistoryByPet = async (req, res, next) => {
    const petId = req.params.petId;
    try{
        const history = await attendanceService.findByPet(petId);
        res.status(200).json({
            message: 'The history was successfully list.',
            status: 'OK',
            data: history
        });
    } catch (error) {
        res.status(503).json({
            message: 'The history could not be list. Please try again.',
            status: 'Failed',
            data: error
        });
    }
}

module.exports = { registerAttendace, getHistoryByPet }
