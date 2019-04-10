var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const reviews = mongoose.model('reviews')

/* GET users listing. */
router.get('/count', (req, res) => {
    reviews.find({user: req.user}).exec(function (err, results) {
        var count = results.length
        res.send({count: count});
      
      });
});

module.exports = router;
