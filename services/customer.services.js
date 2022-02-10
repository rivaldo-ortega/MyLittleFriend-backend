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
            const customer = await Customer.findById(id).select({ __v: 0, password: 0 });
            return customer;
        } catch (error) {
            throw new ErrorHttp(error, 503);
        }
    },
    async activeUser(query) {
        try{
            const user = await Customer.findOne(query);
            if(!user){
                throw new ErrorHttp('User not registered.', 403)
            }
            user.active = true;
            user.passwordResetToken = null;
            user.passwordResetExpires = null;
            const userValidated = await user.save();
            return userValidated;
        } catch (error){
            throw new ErrorHttp(error, 404)
        }
        
    },
    async addCustomerPaymentId(id, paymentId) {
        try {
            const customer = await Customer.findById(id);
            customer.customer_payment_id = paymentId;
            const customerUpdated = await customer.save();
            return customerUpdated;
        } catch (error) {
            throw new ErrorHttp(error, 503);
        }
    },
    async addCard(id, card) {
        try {
            const customer = await Customer.findById(id);
            if(!customer.cards || !customer.cards.length ) customer.cards = [card];
            else customer.cards.push(card);
            const customerUpdated = await customer.save();
            return customerUpdated;
        } catch (error) {
            throw new ErrorHttp(error, 503);
        }
    },
    async addPayment(id, payment) {
        try {
            const customer = await Customer.findById(id);
            if(!customer.payments || !customer.payments.length ) customer.payments = [payment];
            else customer.payments.push(payment);
            const customerUpdated = await customer.save();
            return customerUpdated;
        } catch (error) {
            throw new ErrorHttp(error, 503);
        }
    },
    async deleteCard(id) {
        try {
            const customer = await Customer.findById(id);
            customer.cards = [];
            const customerUpdated = await customer.save();
            return customerUpdated;
        } catch (error) {
            throw new ErrorHttp(error, 503);
        }
    },
};

module.exports = customerService;
