const passportJWT = require('passport-jwt');
const key = require('../config/keys')
const JWTStratergy = passportJWT.Strategy;
const ExtractStratergy = passportJWT.ExtractJwt;

module.exports = (passport, User) => {
    passport.use(new JWTStratergy ({
        jwtFromRequest: ExtractStratergy.fromAuthHeaderAsBearerToken(),
        secretOrKey: key.jwtSecret
    }, async function(jwtPayload, cb) {
        try{
            const user = await User.findOne({id: jwtPayload.sub});
            return cb(null,user);
        }catch(err){
            return cb(err);
        }
    }))
}