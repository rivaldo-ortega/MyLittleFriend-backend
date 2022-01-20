const jwt = require('jsonwebtoken');

const loginCustomer = (req, res) => {
    if(req.user){
      const payload = {
          sub: req.user._id,
          email: req.user.email
      };
      const token = jwt.sign(payload , process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({
        message: 'The customer was successfully login',
        status: 'OK',
        data: {
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
