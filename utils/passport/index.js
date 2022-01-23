const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JWTStrategy = require('./strategies/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JWTStrategy);