const jwt = require('jsonwebtoken');
const { secret } = require('../config/index.js');

const loginCustomer = (req, res) => {
    if(req.user){
      const payload = {
          sub: req.user._id,
          email: req.user.email
      };
      const token = jwt.sign(payload , secret);
      res.status(200).json({
        message: 'The customer was successfully login',
        status: 'OK',
        data: {
          id: req.user._id,
          full_name: req.user.full_name,
          address: req.user.address,
          avatar_url: req.user.avatar_url,
          token
        }
      });
    } else {
      res.status(503).json({
        message: 'The customer could not be login. Please try again.',
        status: 'Failed',
        data: {}
      });
    }
}

module.exports = { loginCustomer };
