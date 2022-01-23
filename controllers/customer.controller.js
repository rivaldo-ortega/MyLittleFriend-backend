const CustomerServices = require('../services/customer.services');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const findCustomer = async (req, res, next) => {
    const { customerId } = req.params;
    try {
        const customer = await CustomerServices.findById(customerId);
        res.status(200).json({
            message: 'The customer was successfully find.',
            status: 'OK',
            data: customer
        });

    } catch (error) {
        res.status(503).json({
            message: 'Error processing the request.',
            status: 'Failed',
            data: err
        });
    }
}

const signUpCustomer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(403).json({
            message: errors,
            status: 'Failed',
            data: {}
        });
    } else {
        const { full_name, email, password, address, pets, avatar_url } = req.body;
        const passwordEncrypted = await bcrypt.hash(password, 10);
        const existsUser = await CustomerServices.findByEmail({ email });
        if (existsUser) {
            res.status(403).json({
                message: 'This email address already exists',
                status: 'Failed',
                data: {}
            });
        } else {
            try {
                const newCustomer = await CustomerServices.register({ full_name, email, password: passwordEncrypted, address, pets, avatar_url });
                res.status(200).json({
                    message: 'The customer was successfully registered',
                    status: 'OK',
                    data: {}
                });
            } catch (error) {
                res.status(503).json({
                    message: 'The customer could not be registered. Please try again.',
                    status: 'Failed',
                    data: err
                });
            }
        }
    }
}

module.exports = { findCustomer, signUpCustomer };
