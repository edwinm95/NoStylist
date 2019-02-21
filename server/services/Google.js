const LocalStratergy = require('passport-local').Strategy
module.exports = (passport, User) => {
    passport.use('local-google', new LocalStratergy(
        {   
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        }, async (request, username, password, done) => {
           const existingUser = await User.findOne({'google.id': request.body.id});
           if(!existingUser){
                done(null,false,{success: false, message: "Didn't find Account linked with that Google Account"})
           }
           done(null,existingUser,{success: true, message: "User authenticated"});
        }
        
    ))
}