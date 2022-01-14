const Veterinary = require('../models/veterinary.schema');

const veterinaryService = {
    async register(veterinary) {
        try {
            const newVeterinary = new Veterinary(veterinary);
            await newVeterinary.save();
            return newVeterinary;
        } catch (err) {
            return err;
        }
    },

};

module.exports = veterinaryService;