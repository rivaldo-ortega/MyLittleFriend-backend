const PetServices = require('../services/pet.services');
const { validationResult } = require('express-validator');

const findPet = async (req, res, next) => {
    const { petId } = req.params;

    try {
        const pet = await PetServices.findPetById(petId);
        res.status(200).json({
            message: 'The pet was successfully find.',
            status: 'OK',
            data: pet
        });
    } catch (err) {
        res.status(503).json({
            message: 'Error processing the request.',
            status: 'Failed',
            data: err
        });
    }
}

const registerPet = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            message: errors,
            status: 'Failed',
            data: {}
        });
    }

    const petJson = { ...req.body };
    const ownerId = req.body.owner;

    try {
        await PetServices.register(petJson, ownerId);
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

const updatePet = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            message: errors,
            status: 'Failed',
            data: {}
        });
    } else {
        const { petId } = req.params;
        const { name, detail, birthdate, type, avatar_url } = req.body;

        try {
            await PetServices.updatePetById(petId, { name, detail, birthdate, type, avatar_url, _id: petId });
            res.status(200).json({
                message: 'The pet was successfully updated',
                status: 'OK',
                data: {}
            });
        } catch (err) {
            res.status(503).json({
                message: 'The pet could not be updated. Please try again.',
                status: 'Failed',
                data: err
            });
        }
    }
}

const deletePet = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            message: errors,
            status: 'Failed',
            data: {}
        });

    } else {
        const { id } = req.body;

        try {
            await PetServices.deletePetById(id);
            res.status(200).json({
                message: 'The pet was successfully deleted',
                status: 'OK',
                data: {}
            });

        } catch (err) {
            res.status(503).json({
                message: 'The pet could not be deleted. Please try again.',
                status: 'Failed',
                data: err
            });
        }
    }
}

const findPetsByOwner = async (req, res, next) => {
    try{
        const ownerId = req.params.customerId;
        const pets = await PetServices.getByOwner(ownerId)
        res.status(200).json({
            message: 'The pets was successfully list',
            status: 'OK',
            data: pets
        });
    } catch (error) {
        res.status(503).json({
            message: 'The pest could not be list. Please try again.',
            status: 'Failed',
            data: error
        });
    }
}

module.exports = { findPet, registerPet, updatePet, deletePet, findPetsByOwner };
