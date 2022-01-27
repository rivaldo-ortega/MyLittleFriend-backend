const attendanceService = require('../services/attendace.services');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');
const ErrorHttp = require('../middlewares/httpError.middleware');

const registerAttendace = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errors)
    }

    const attendaceJson = {...req.body};
    const petId = req.body.pet;

    const newAttendance = await attendanceService.register(attendaceJson, petId);
    if(!newAttendance.errors){
        throw new ErrorHttp('The attendance was successfully registered.', 200)
    } else {
        throw new ErrorHttp(errors)
    }
});

const getHistoryByPet = asyncHandler(async(req, res, next) => {
    const petId = req.params.petId;
    
    const history = await attendanceService.findByPet(petId);
    if(!history.errors){
        throw new ErrorHttp('The history was successfully list.', 200)
    } else {
        throw new Error(history)
    }
})

module.exports = { registerAttendace, getHistoryByPet }
