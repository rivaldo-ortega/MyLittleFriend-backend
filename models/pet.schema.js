const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    detail: { type: String, maxLength: 200 },
    birthdate: { type: Date },
    type: { type: String, required: true },
    avatar_url: { type: String },
    medical_history: [{ type: Schema.Types.ObjectId, ref: 'Attendance' }]
});

module.exports = mongoose.model('Pet', PetSchema);
