const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = require('./service.schema');

const VeterinarySchema = new Schema({
    name: { type: String, required: true },
    detail: { type: String, required: true },
    location: { type: String, required: true },
    avatar_url: { type: String },
    services: [ServiceSchema]
});

module.exports = mongoose.model('Veterinary', VeterinarySchema);
