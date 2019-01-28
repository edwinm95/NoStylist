    const passport = require('passport')
    const mongoose = require('mongoose');
    const GoogleStratergy = require('passport-google-oauth20').Strategy
    const FaceBookStratergy = require('passport-facebook').Strategy
    const keys = require('../config/keys');

    const User = mongoose.model('users');
    passport.serializeUser((user,done) => {
        done(null,user.id)
    })
    passport.deserializeUser(async (id,done) => {
        const user = await User.findById(id);
        if(user){
            done(null,user)
        }
    });
    passport.use(new GoogleStratergy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, async (acessToken, refreshToken, profile, done) => {
           const existingUser = await User.findOne({googleId: profile.id});
           if(!existingUser){
            const user = await new User({googleId: profile.id}).save();
            done(null,user);
           }
           done(null,existingUser);
        }
    ))
    passport.use(new FaceBookStratergy(
        {
            clientID: keys.facebookClientID,
            clientSecret: keys.facebookClientSecret,
            callbackURL: '/auth/facebook/callback'
        }, async (acessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({facebookId: profile.id})
            if(!existingUser){
                const user = await new User({facebookId: profile.id}).save();
                done(null,user);
            }
            done(null,existingUser);

        }
    ))

