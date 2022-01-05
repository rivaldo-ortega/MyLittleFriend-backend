const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = require('./service.schema');

const RequestServiceSchema = new Schema({
    service: ServiceSchema,
    pet: { type: Schema.Types.ObjectId, ref: 'Pet', required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('RequestService', RequestServiceSchema);
