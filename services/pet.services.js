const Pet = require('../models/pet.schema');

const PetService = {
    async register(pet) {
        try {
            const newPet = await new Pet(pet);
            await newPet.save();
            return newPet;
        } catch (err) {
            return err;
        }
    }
}

module.exports = PetService;
