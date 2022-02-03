const Customer = require('../models/customer.schema');
const ErrorHttp = require('../middlewares/httpError.middleware')

const customerService = {
    async register(customer) {
        try {
            const newCustomer = new Customer(customer);
            await newCustomer.save();
            console.log(newCustomer)
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
    },
    async activeUser(query) {
        try{
            const userVali = await Customer.findOne(query);
            userVali.active = true;
            userVali.passwordResetToken = null;
            userVali.passwordResetExpires = null;
            await userVali.save();
            return userVali;
        } catch (error){
            return new ErrorHttp(error, 404)
        }
        
      }
    
};

module.exports = customerService;
