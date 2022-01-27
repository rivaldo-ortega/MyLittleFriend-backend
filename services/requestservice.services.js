const Veterinary = require('../models/veterinary.schema');
const Pet = require('../models/pet.schema');
const RequestService = require('../models/requestservice.schema');

const PetServices = {
    async listRequestsService() {
        try {
            const serviceRequests = await RequestService.find();
            return serviceRequests;
        } catch (error) {
            throw new Error(error);
        }
    },

    async findRequestServiceById(id) {
        try {
            const serviceReq = await RequestService.findById(id).select({ __v: 0 });
            return serviceReq;
        } catch (error) {
            throw new Error(error);
        }
    },

    async register(requestService, veterinary, owner) {
        try {
            await Veterinary.findById(veterinary);
            await Pet.findById(owner);

            const newRequestService = await new RequestService(requestService);
            await newRequestService.save()
            return newRequestService;
        } catch (error) {
            throw new Error(error);
        }
    },
}

module.exports = PetServices;
