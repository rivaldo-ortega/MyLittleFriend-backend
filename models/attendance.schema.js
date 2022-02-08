const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = require('./recipe.schema');

const AttendanceSchema = new Schema({
    date: { type: Date, required: true },
    veterinary: { type: Schema.Types.ObjectId, ref: 'Veterinary', required: true },
    pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    request: { type: Schema.Types.ObjectId, ref: 'RequestService', required: true },
    status: { type: String, required: false, default: 'Pendiente' },
    attendance_detail: { type: String, required: false },
    recipe: [RecipeSchema],
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
