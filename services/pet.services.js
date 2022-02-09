const Customer = require('../models/customer.schema');
const Pet = require('../models/pet.schema');
const mongoose = require('mongoose');

const PetServices = {
    async findPetById(id) {
        try {
            const pet = await Pet.findById(id).select({ __v: 0 }).populate({
                path: 'medical_history',
                model: 'Attendance',
                select: {
                    'date': 1,
                    'status': 1,
                    'attendance_detail': 1,
                    'recipe': 1
                }
            });
            return pet;
        } catch (error) {
            throw new Error(error);
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
                    throw new Error(error);
                }
                /* End transaction */
            } else {
                throw new Error('This owner does not exist in the database');
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    async updatePetById(id, pet) {
        try {
            const currentPet = await Pet.findById(id);
            if(pet.birthdate != '') currentPet.birthdate = pet.birthdate;
            if(pet.detail != '') currentPet.detail = pet.detail;
            if(pet.avatar_url != '') currentPet.avatar_url = pet.avatar_url;
            const petUpdated = await currentPet.save()
            return petUpdated;
        } catch (error) {
            throw new Error(error);
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
            } catch (error) {
                throw new Error(error);
            }
        } catch (error) {
            throw new Error(error);
        }

    },

    async getByOwner(ownerId) {
        try{
            const pets = await Pet.find({ owner: ownerId }).select({ __v: 0, medical_history: 0 })
            if (!pets) {
                throw new Error('Could not find pets for the provided owner.')
            }
            return pets;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = PetServices;
