const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    full_name: { type: String, required: true, maxLength: 150 },
    email: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true },
    address: { type: String, required: true, maxLength: 120 },
    pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
    avatar_url: { type: String },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {type: Boolean, default: false},
});

module.exports = mongoose.model('Customer', CustomerSchema);
