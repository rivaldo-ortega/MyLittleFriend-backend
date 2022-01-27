const Customer = require('../models/customer.schema');
const ErrorHttp = require('../middlewares/httpError.middleware')

const customerService = {
    async register(customer) {
        try {
            const newCustomer = new Customer(customer);
            await newCustomer.save();
            return newCustomer;
        } catch (error) {
            throw new ErrorHttp(error, 503);
        }
    },
    async findByEmail(email) {
        try {
            const customer = await Customer.findOne(email).select({ __v: 0, pets: 0 });
            return customer;
        } catch (error) {
            throw new ErrorHttp(error, 503);
        }
    },
    async findById(id) {
        try {
            const customer = Customer.findById(id).select({ __v: 0, password: 0 });
            return customer;
        } catch (error) {
            throw new ErrorHttp(error, 503);
        }
    }
};

module.exports = customerService;
