var express =  require('express')
var router = express.Router();
var keys = require('../config/keys')
router.get('/current_user', (req,res) => {
    res.send(req.user)
})

router.get('/googleClientID', (req,res) => {
    res.send(keys.googleClientID);
})
router.get('/facebookClientID', (req,res) => {
    res.send(keys.facebookClientID)
})

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router