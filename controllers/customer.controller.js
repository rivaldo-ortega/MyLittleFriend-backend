const CustomerServices = require('../services/customer.services');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');

const findCustomer = asyncHandler(async(req, res, next) => {
    const { customerId } = req.params;
    
    const customer = await CustomerServices.findById(customerId);
        res.status(200).json({
            message: 'The customer was successfully find.',
            status: 'OK',
            data: customer
        });
})

const signUpCustomer = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(errors)
    } else {
        const { full_name, email, password, address, pets, avatar_url } = req.body;
        const passwordEncrypted = await bcrypt.hash(password, 10);
        await CustomerServices.findByEmail({ email });
        await CustomerServices.register({ full_name, email, password: passwordEncrypted, address, pets, avatar_url });
            res.status(200).json({
                message: 'The customer was successfully registered',
                status: 'OK',
                data: {}
            });
    }
})



module.exports = { findCustomer, signUpCustomer };
