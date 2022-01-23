const { Strategy, ExtractJwt } = require('passport-jwt');

//Extraemos el jwt del header
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

//Creamos la estrategia para validar el jwt
const JWTStrategy = new Strategy(options, (payload, done) => {
    return done(null, payload)
});

module.exports = JWTStrategy;