const Customer = require('../models/customer.schema');

const customerService = {
    async register(customer) {
        try {
            const newCustomer = new Customer(customer);
            await newCustomer.save();
            return newCustomer;
        } catch (err) {
            return err;
        }
    },
    async findByEmail(email) {
        try {
            const user = await Customer.findOne(email).select({ __v: 0, pets: 0 });
            return user;
        } catch (err) {
            return err;
        }
    },
    async findById(id) {
        try {

        } catch (err) {

        }
    }
};

module.exports = customerService;
