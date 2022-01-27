const PetServices = require('../services/pet.services');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const findPet = asyncHandler(async (req, res, next) => {
    const { petId } = req.params;

    const pet = await PetServices.findPetById(petId);
        res.status(200).json({
            message: 'The pet was successfully find.',
            status: 'OK',
            data: pet
        });
})

const registerPet = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    }

    const petJson = { ...req.body };
    const ownerId = req.body.owner;

    const petService = await PetServices.register(petJson, ownerId);
        res.status(200).json({
            message: 'The pet was successfully registered',
            status: 'OK',
            data: petService
        });
})

const updatePet = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    } else {
        const { petId } = req.params;
        const { name, detail, birthdate, type, avatar_url } = req.body;

        await PetServices.updatePetById(petId, { name, detail, birthdate, type, avatar_url, _id: petId });
            res.status(200).json({
                message: 'The pet was successfully updated',
                status: 'OK',
                data: {}
            });
    }
}

) 

const deletePet = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    } else {
        const { id } = req.body;

        await PetServices.deletePetById(id);
            res.status(200).json({
                message: 'The pet was successfully deleted',
                status: 'OK',
                data: {}
            });
    }
})

const findPetsByOwner = asyncHandler(async (req, res, next) => {

    const ownerId = req.params.customerId;
    await PetServices.getByOwner(ownerId)
        res.status(200).json({
            message: 'The pets was successfully list',
            status: 'OK',
            data: pets
        });
})

module.exports = { findPet, registerPet, updatePet, deletePet, findPetsByOwner };
