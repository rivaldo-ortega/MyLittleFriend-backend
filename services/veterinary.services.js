const Veterinary = require('../models/veterinary.schema');

const veterinaryService = {
    async register(veterinary) {
        try {
            const newVeterinary = new Veterinary(veterinary);
            await newVeterinary.save();
            return newVeterinary;
        } catch (error) {
            return error;
        }
    },
    async get() {
        try {
            const veterinaries = Veterinary.find().select({ __v: 0 });
            return veterinaries;
        } catch (error) {
            return error;
        }
    },
    async getById(veterinaryId) {
        try {
            const veterinary = Veterinary.findById(veterinaryId).select({ __v: 0 });
            return veterinary;
        } catch (error) {
            return error;
        }
    },
};

module.exports = veterinaryService;