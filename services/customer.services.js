const Customer = require('../models/customer.schema');

const customerService = {
    async register(customer) {
        try {
            const newCustomer = new Customer(customer);
            await newCustomer.save();
            return newCustomer;
        } catch (error) {
            return error;
        }
    },
    async findByEmail(email) {
        try {
            const customer = await Customer.findOne(email).select({ __v: 0, pets: 0 });
            return customer;
        } catch (error) {
            return error;
        }
    },
    async findById(id) {
        try {
            const customer = Customer.findById(id).select({ __v: 0, password: 0 });
            return customer;
        } catch (error) {
            return error;
        }
    }
};

module.exports = customerService;
