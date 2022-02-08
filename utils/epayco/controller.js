const asyncHandler = require('../../middlewares/asyncHandler.middleware.js');
const customerServices =  require('../../services/customer.services');
const { validationResult } = require('express-validator');
const { registerCard, registerCustomer, registarCardForCustomer, registerPayment, deleteTokenCardToCustomer } =  require('./services.js');

const defineCustomer = (customerData) => {
  const { cardToken, name, lastName, email, city, address, phone, cellPhone } = customerData;

  const customer = {
    token_card: cardToken,
    name: name,
    last_name: lastName,
    email: email,
    default: true
  };
  city ? customer.city= city : null;
  address ? customer.address= address : null;
  phone ? customer.phone= phone : null;
  cellPhone ? customer.cell_phone= cellPhone : null;

  return customer;
};

const addCardToCustomer = async (cardData) => {
  const cardPushed = await registarCardForCustomer(cardData);
}

const generetaCardtoken = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors)
  };

  const { number, expYear, month, cvc, customerId } = req.body;

  const card = {
    "card[number]": number,
    "card[exp_year]": expYear,
    "card[exp_month]": month,
    "card[cvc]": cvc
  }

  const cardToken = await registerCard(card);
  await customerServices.addCard(customerId, cardToken)

  if(req.body.customerPaymentId){
    const cardData = { token_card: cardToken.id, customer_id: req.body.customerPaymentId}
    await addCardToCustomer(cardData);
  }

  res.status(200).json({
    message: 'The card was successfully registered.',
    status: 'Ok',
    data: cardToken
  })
});

const generateCustomerToken = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors)
  };

  const customer = defineCustomer(req.body)

  const customerToken = await registerCustomer(customer);
  await customerServices.addCustomerPaymentId(customerId, customerToken);

  res.status(200).json({
    message: 'The customer was successfully registered.',
    status: 'Ok',
    data: { customerToken }
  })
});

const makePayment = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(errors)
  };

  const { customerId, cardToken, bill, description, docType, docNumber, value, name, lastName, tax, taxBase, email, currency, dues, ip } = req.body;

  const payment = {
    token_card: cardToken,
    doc_type: docType,
    doc_number: docNumber,
    name,
    last_name: lastName,
    email,
    bill,
    description,
    value,
    tax,
    tax_base: taxBase,
    currency,
    dues,
    ip
  };

  if(!req.body.customerPaymentId){
    const customer = defineCustomer({ cardToken, name, lastName, email });
    const customerToken = await registerCustomer(customer);
    await customerServices.addCustomerPaymentId(customerId, customerToken);
    payment.customer_id = customerToken;
  }else{
    payment.customer_id = req.body.customerPaymentId;
  }

  const paymentRegistered =  await registerPayment(payment);
  await customerServices.addPayment(customerId, paymentRegistered.data)

  res.status(200).json({
    message: 'The payment was successfully registered.',
    status: 'Ok',
    data: paymentRegistered.data
  })

});

const deleteCardToken = asyncHandler(async (req, res, next) => {

  const { customerPaymentId, customerId } = req.body;

  var delete_customer_info = {
    franchise : "visa",
    mask : "457562******0326",
    customer_id: customerPaymentId
  }

  const cardDeleted = await deleteTokenCardToCustomer(delete_customer_info);

  await customerServices.deleteCard(customerId)

  res.status(201).json({
    message: 'The card was successfully deleted.',
    status: 'Ok',
    data: {}
  })
})

module.exports = { generetaCardtoken, generateCustomerToken, makePayment, deleteCardToken }
