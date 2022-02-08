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
        const { birthdate, detail, avatar_url } = req.body;

        await PetServices.updatePetById(petId, { detail, birthdate, avatar_url });
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
        const { petId } = req.params;

        await PetServices.deletePetById(petId);
            res.status(200).json({
                message: 'The pet was successfully deleted',
                status: 'OK',
                data: {}
            });
    }
})


const findPetsByOwner = async (req, res, next) => {
    try{
        const ownerId = req.params.customerId;
        const pets = await PetServices.getByOwner(ownerId)
        if(pets.length){
            res.status(200).json({
                message: 'The pets was successfully list',
                status: 'OK',
                data: pets
            });
        }else{
            res.status(201).json({
                message: `User doesn't have pets yet.`,
                status: 'OK',
                data: []
            });
        }
    } catch (error) {
        res.status(503).json({
            message: 'The pest could not be list. Please try again.',
            status: 'Failed',
            data: error
        });
    }
}


module.exports = { findPet, registerPet, updatePet, deletePet, findPetsByOwner };
