const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { type: String, required: true },
    detail: { type: String, required: true },
    price: { type: Number, required: true },
    img_url: { type: String, required: true }
});

module.exports = ServiceSchema;
