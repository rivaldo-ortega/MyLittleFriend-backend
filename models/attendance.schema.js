const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = require('./recipe.schema');

const AttendanceSchema = new Schema({
    date: { type: Date, required: true },
    veterinary: { type: Schema.Types.ObjectId, ref: 'Veterinary', required: true },
    pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    attendance_detail: { type: String, required: true },
    recipe: [RecipeSchema],
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
