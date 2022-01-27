const PetServices = require('../services/pet.services');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');
const ErrorHttp = require('../middlewares/httpError.middleware');

const findPet = asyncHandler(async (req, res, next) => {
    const { petId } = req.params;

    const pet = await PetServices.findPetById(petId);
    if(pet){
        throw new ErrorHttp('The pet was successfully find.', 200)
    } else {
        throw new Error(errors)
    }
})

const registerPet = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    }

    const petJson = { ...req.body };
    const ownerId = req.body.owner;

    const petService = await PetServices.register(petJson, ownerId);
    if(petService.errors){
        throw new ErrorHttp('The pet was successfully registered', 200)
    } else {
        throw new Error(errors)
    }
})

const updatePet = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    } else {
        const { petId } = req.params;
        const { name, detail, birthdate, type, avatar_url } = req.body;

        const petUser = await PetServices.updatePetById(petId, { name, detail, birthdate, type, avatar_url, _id: petId });
        if(!petUser.errors){
            throw new ErrorHttp('The pet was successfully updated', 200)
        } else {
            throw new Error(errors)
        }
    }
}

) 

const deletePet = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    } else {
        const { id } = req.body;

        const petDelete = await PetServices.deletePetById(id);
        if(!petDelete.errors){
            throw new ErrorHttp('The pet was successfully deleted', 200)
        } else {
            throw new Error(errors)
        }
    }
})

const findPetsByOwner = asyncHandler(async (req, res, next) => {

    const ownerId = req.params.customerId;
    const pets = await PetServices.getByOwner(ownerId)
    if(pets){
        throw new ErrorHttp('The pets was successfully list', 200)
    }else {
        throw new Error(errors)
    }
})

module.exports = { findPet, registerPet, updatePet, deletePet, findPetsByOwner };
