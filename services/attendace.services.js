const Pet = require('../models/pet.schema');
const Attendance = require('../models/attendance.schema');
const mongoose = require('mongoose');

const attendanceService = {
  async register(attendance, pet) {
    try{
      const petAttended =  await Pet.findById(pet)
      if(petAttended){
        /**
         * Start transaction
         */
        try{
          const newAttendance = new Attendance(attendance);
          const session = await mongoose.startSession();
          await session.withTransaction(async () => {
            await newAttendance.save({ session });
            await petAttended.medical_history.push(newAttendance._id);
            await petAttended.save({ session })
          });
          await session.endSession();
          return newAttendance;
        } catch (error) {
          return erroror
        }
        /**
         * End transaction
         */
      }else{
        throw new Error(`Pet does't exists in database.`)
      }
    } catch (error) {
      return erroror
    }
  },
  async findByPet(petId) {
    try{
      const historyForPet = await Pet.findById(petId).populate({
        path: 'medical_history',
        select: { __v: 0 }
      })
      if (!historyForPet || !historyForPet.medical_history.length) {
        throw new Error('Could not find a history for the provided pet.')
      }
      return historyForPet;
    } catch (error) {
      return erroror;
    }
  },
}

module.exports = attendanceService;
