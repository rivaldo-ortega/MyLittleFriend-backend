const PetServices = require('../services/pet.services');
const CustomerServices = require('../services/customer.services');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const PetService = require('../services/pet.services');

const registerPet = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            message: errors,
            status: 'Failed',
            data: {}
        });
    }

    const { name, detail, birthdate, type, avatar_url, owner } = req.body;
    const petOwner = await CustomerServices.findById(owner);
    if (!petOwner) {
        res.status(404).json({
            message: 'The owner could not be found.',
            status: 'Failed',
            data: {}
        });
    }

    try {
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
            const newPet = await PetService.register({ name, detail, birthdate, type, avatar_url, owner });
            console.log(newPet);
            await petOwner.pets.push(newPet._id);
            await petOwner.save({ session })
        });
        await session.endSession();

        res.status(200).json({
            message: 'The pet was successfully registered',
            status: 'OK',
            data: {}
        });

    } catch (err) {
        res.status(503).json({
            message: 'The pet could not be registered. Please try again.',
            status: 'Failed',
            data: err
        });
    }

}

module.exports = { registerPet };
