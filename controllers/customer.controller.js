const CustomerServices = require('../services/customer.services');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

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
        const isExists = await CustomerServices.findByEmail({ email });
        if (isExists) {
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
            } catch (err) {
                res.status(503).json({
                    message: 'The customer could not be registered. Please try again.',
                    status: 'Failed',
                    data: err
                });
            }
        }
    }
}

const loginCustomer = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(403).json({
            message: errors,
            status: 'Failed',
            data: {}
        });
    } else {
        try {
            const { email, password } = req.body;
            const customer = await CustomerServices.findByEmail({ email });
            if (customer) {
                const isPasswordEqual = bcrypt.compareSync(password, customer.password);
                if (isPasswordEqual) {
                    res.status(200).json({
                        message: 'Login successfully.',
                        status: 'Ok',
                        data: {
                            _id: customer._id,
                            full_name: customer.full_name,
                            email: customer.email,
                            address: customer.address,
                            avatar_url: customer.avatar_url
                        }
                    });
                } else {
                    res.status(503).json({
                        message: 'Email or password incorrect. Please try again.',
                        status: 'Failed',
                        data: {}
                    });
                }
            } else {
                res.status(403).json({
                    message: 'Email or password incorrect. Please try again.',
                    status: 'Failed',
                    data: {}
                });
            }

        } catch (err) {
            res.status(503).json({
                message: 'The customer could not be logged in. Please try again.',
                status: 'Failed',
                data: err
            });
        }
    }
}

module.exports = { signUpCustomer, loginCustomer };
