const CustomerServices = require('../services/customer.services');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');
const ErrorHttp = require('../middlewares/httpError.middleware');

const findCustomer = asyncHandler(async(req, res, next) => {
    const { customerId } = req.params;
    
    const customer = await CustomerServices.findById(customerId);
    if(!customer.errors){
        throw new ErrorHttp('The customer was successfully find.', 200);
    } else {
        throw new Error(customer)
    }
})

const signUpCustomer = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    } else {
        const { full_name, email, password, address, pets, avatar_url } = req.body;
        const passwordEncrypted = await bcrypt.hash(password, 10);
        const existsUser = await CustomerServices.findByEmail({ email });
        // console.log(existsUser)
        if (existsUser) {
            throw new ErrorHttp('This email address already exists', 403)          
        } else {
            const newCustomer = await CustomerServices.register({ full_name, email, password: passwordEncrypted, address, pets, avatar_url });
            throw new ErrorHttp('The customer was successfully registered', 200)
            return newCustomer;
        }
    }
})



module.exports = { findCustomer, signUpCustomer };
