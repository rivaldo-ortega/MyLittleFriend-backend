const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = require('./service.schema');

const RequestServiceSchema = new Schema({
    service: { type: String, required: true },
    price: { type: Number, required: true },
    veterinary: { type: Schema.Types.ObjectId, ref: 'Veterinary', required: true },
    pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('RequestService', RequestServiceSchema);
