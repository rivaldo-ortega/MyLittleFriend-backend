const Pet = require('../models/pet.schema');
const Attendance = require('../models/attendance.schema');
const mongoose = require('mongoose');
const ErrorHttp = require('../middlewares/httpError.middleware');

const attendanceService = {
  async register(attendance, pet) {
    try{
      const petAttended =  await Pet.findById(pet)
      if(petAttended){
        /**
         * Start transaction
         */
        const newAttendance = new Attendance(attendance);
        const session = await mongoose.startSession();
        if(session){
          await session.withTransaction(async () => {
            await newAttendance.save({ session });
            await petAttended.medical_history.push(newAttendance._id);
            await petAttended.save({ session })
          });
          await session.endSession();
          return newAttendance;
        } else {
          throw new ErrorHttp(error, 503)
        }    
        /**
         * End transaction
         */
      }else{
        throw new ErrorHttp(`Pet does't exists in database.`, 404)
      }
    } catch (error) {
      return error
    }
  },
  async findByPet(petId) {
    try{
      const historyForPet = await Pet.findById(petId).populate({
        path: 'medical_history',
        select: { __v: 0 }
      })
      if (!historyForPet || !historyForPet.medical_history.length) {
        throw new ErrorHttp('Could not find a history for the provided pet.', 404)
      }
      return historyForPet;
    } catch (error) {
      return error;
    }
  },
}

module.exports = attendanceService;
