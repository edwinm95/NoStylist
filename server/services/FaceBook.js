const LocalStratergy = require('passport-local').Strategy
module.exports = (passport, User) => {
    passport.use('local-facebook', new LocalStratergy(
        {   
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, async (request, username, password, done) => {
           const existingUser = await User.findOne({'facebook.id': request.body.id});
           if(!existingUser){
                done(null,false,{success: false, message: "Didn't find Account linked with that Facebook Account"})
           }
           done(null,existingUser,{success: true, message: "User authenticated"});
        }
        
    ))
}