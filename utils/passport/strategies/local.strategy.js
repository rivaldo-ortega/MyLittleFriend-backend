const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');

const customerServices = require('../../../services/customer.services')

const LocalStrategy = new Strategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try{
            const user = await customerServices.findByEmail({ email });
            if(!user){
                return done({ message: 'Email or password incorrect. Please try again.' }, false)
            }else if(user){
                const isMatch = await bcrypt.compare(password, user.password);
                if(isMatch){
                    done(null, user)
                }else{
                    return done({ message: 'Email or password incorrect. Please try again.' }, false)
                }
            } else {
                return done({ message: 'Email or password incorrect. Please try again.' }, false)
            }
        } catch (error) {
            return done({ error, message: 'The customer could not be logged in. Please try again.' }, false);
        }
    }
);

module.exports = LocalStrategy;