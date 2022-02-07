const CustomerServices = require('../services/customer.services');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler.middleware.js');
const { sendEmail } = require('../utils/email');
const crypto = require('crypto');

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
        const hash = crypto.createHash('sha256').update(email).digest('hex');
        passwordResetToken = hash;
        passwordResetExpires = Date.now()+3600000*24;
        const newUser = await CustomerServices.register({ full_name, email, password: passwordEncrypted, address, pets, avatar_url, passwordResetToken, passwordResetExpires });
            res.status(200).json({
                message: 'The customer was successfully registered',
                status: 'OK',
                data: {}
            });
        
        const email1 = {
            to: newUser.email,
            subject: 'Confirma tu email',
            template_id: 'd-51870cb2f39a4dfb89dfba7cbb827c39',
            dynamic_template_data: {
                firstName: newUser.full_name,
                url: `${process.env.URL_VALIDATE_REGISTER}/${newUser.passwordResetToken}`,
                urlHome:'https://eager-ramanujan-86071f.netlify.app/',
            },
        }
        sendEmail(email1)
    }
})

const findPaymentDataById = asyncHandler(async (req, res, next) => {
    const { customerId } = req.params;

    const customer = await CustomerServices.findById(customerId);
        res.status(200).json({
            message: 'The customer payment data  was successfully listed',
            status: 'OK',
            data: { cards: customer.cards || [], customerPaymentId: customer.customer_payment_id || '' }
        });
})



module.exports = { findCustomer, signUpCustomer, findPaymentDataById };
