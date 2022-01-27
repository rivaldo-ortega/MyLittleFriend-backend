const Veterinary = require('../models/veterinary.schema');

const veterinaryService = {
    async register(veterinary) {
        try {
            const newVeterinary = new Veterinary(veterinary);
            await newVeterinary.save();
            return newVeterinary;
        } catch (error) {
            throw new Error(error);
        }
    },

};

module.exports = veterinaryService;