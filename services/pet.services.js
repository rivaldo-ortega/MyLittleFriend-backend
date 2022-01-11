const Pet = require('../models/pet.schema');

const PetServices = {
    async register(pet) {
        try {
            const newPet = await new Pet(pet);
            await newPet.save();
            return newPet;
        } catch (err) {
            return err;
        }
    },
    async findPetById(id) {
        try {
            const pet = await Pet.findById(id).select({ __v: 0 });
            return pet;
        } catch (err) {
            return err;
        }
    },
    async deletePetById(id, session) {
        try {
            const pet = await Pet.findByIdAndDelete(id, { session }).populate('owner');
            return pet;
        } catch (err) {
            return err;
        }
    }
}

module.exports = PetServices;
