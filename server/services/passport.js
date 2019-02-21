const passport = require('passport')
const keys = require('../config/keys');
const mongoose = require('mongoose')
const user = mongoose.model('users');
passport.serializeUser(function(user,done){
    done(null,user.id)
});
passport.deserializeUser(function(id,done){
    user.findById(id, function(err, user){
        done(err,user);
    });
})
require('./Google')(passport,user);
require('./FaceBook')(passport,user);
require('./Local')(passport,user);