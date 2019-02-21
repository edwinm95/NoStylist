const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
var createToken = function(user){

    var payload = {
        name: user.name,
        username: user.username,
        email: user.email,
        _id: user._id.toString()
    }
    return jwt.sign(payload, keys.jwtSecret , {expiresIn: 30 * 24 * 60 * 60 * 1000} );
};

module.exports = {
    generateToken: function(req,res,next){
        req.token = createToken(req.user);
        return next();
    },
    sendToken: function(req,res){
        res.setHeader('x-auth-token', req.token);
        return res.status(200).send(JSON.stringify(req.user));
    }
}