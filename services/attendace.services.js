const Pets = require('../models/pet.schema');
const Attendance = require('../models/attendance.schema');
const mongoose = require('mongoose');

const attendanceService = {
  async register(attendance, pet) {
    try{
      const petAttended =  await Pets.findById(pet)
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
        }catch(error){
          return error
        }
        /**
         * End transaction
         */
      }else{
        throw new Error(`Pet does't exists in database.`)
      }
    }catch(error){
      return error
    }
  },
}

module.exports = attendanceService;
