var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = mongoose.model('users')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/get', async function(req,res,next){
  const {id} = req.body
  var foundUser =  await User.findById(id)
  res.send(foundUser)
})

module.exports = router;
