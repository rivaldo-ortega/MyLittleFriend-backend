const Customer = require('../models/customer.schema');
const Pet = require('../models/pet.schema');
const mongoose = require('mongoose');

const PetServices = {
    async findPetById(id) {
        try {
            const pet = await Pet.findById(id).select({ __v: 0 });
            return pet;
        } catch (err) {
            return err;
        }
    },

    async register(pet, owner) {
        try {
            const petOwner = await Customer.findById(owner);
            if (petOwner) {
                /* Start transaction */
                try {
                    const newPet = await new Pet(pet);
                    const session = await mongoose.startSession();
                    await session.withTransaction(async () => {
                        await newPet.save({ session });
                        await petOwner.pets.push(newPet._id);
                        await petOwner.save({ session });
                    })
                    await session.endSession();
                    return newPet;
                } catch (error) {
                    return error;
                }
                /* End transaction */
            } else {
                throw new Error('This owner does not exist in the database');
            }
        } catch (err) {
            return err;
        }
    },

    async updatePetById(id, pet) {
        try {
            const newPet = await new Pet(pet);
            const updatePet = await Pet.findByIdAndUpdate(id, newPet);
            return updatePet;
        } catch (err) {
            return err;
        }
    },

    async deletePetById(id) {
        try {
            await this.findPetById(id);

            try {
                const session = await mongoose.startSession();
                await session.withTransaction(async () => {
                    const pet = await Pet.findByIdAndDelete(id, { session }).populate('owner');
                    pet.owner.pets.pull(pet);
                    await pet.owner.save({ session });
                });
                session.endSession();
                return;
            } catch (err) {
                return err;
            }
        } catch (err) {
            return err;
        }

    },

    async getByOwner(ownerId) {
        try{
            const pets = await Pet.find({ owner: ownerId }).select({ __v: 0, medical_history: 0 })
            if (!pets || !pets.length) {
                throw new Error('Could not find pets for the provided owner.')
            }
            return pets;
        }catch(error){
            return error;
        }
    }
}

module.exports = PetServices;
