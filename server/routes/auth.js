const passport = require('passport');
const keys = require('../config/keys')
const {generateToken, sendToken} = require('../utils/token.utils')
const jwt = require('jsonwebtoken')
var express =  require('express')
var router = express.Router();


router.post('/facebook', function(req,res,next) {
    passport.authenticate('local-facebook', function(err,user,info) {
        if(!user){
            return res.send(info)
        }
        req.login(user, function (err){
            if(err){
                return next(err);
            }
            return res.send(info)
        });
    })
    (req,res);
 });

    router.post('/google', function(req,res,next) {
        passport.authenticate('local-google', function(err,user,info) {
            if(!user){
                return res.send(info)
            }
            req.login(user, function (err){
                if(err){
                    return next(err);
                }
                return res.send(info)
            });
        })
        (req,res);
     });


router.post('/login', 
        passport.authenticate('local-signin', { failureRedirect: '/Signin' }),
        function(req,res){
            res.redirect('/');
        }
    );
router.post('/signup', function(req,res,next){
        passport.authenticate('local-signup', function(err,user,info) {
            if(err){
                return res.send({message: err});
            }
            if(!user){
                return res.send(info)
            }
            req.login(user, function (err){
                if(err){
                    return next(err);
                }
                return res.send(info)
            });

        })(req,res)
    });

module.exports = router;
    