var express = require('express')
var router = express.Router();
var paypal = require('paypal-rest-sdk')
var openIdConnect = paypal.openIdConnect
var keys = require('../config/keys')

router.get('/connect',(req,res) => {
    console.log(req.query)
})
router.post('/pay', (req,res) => {
    var payReq = JSON.stringify({
        payer:{
            payment_method: 'paypal'
        },
        redirect_urls:{
            return_url:'http://localhost:3000/process',
            cancel_url:'http://localhost:3000/cancel'
          },
        transactions:[{
            amount:{
              total: req.item.price,
              currency:'USD'
            },
            description:'This is the payment transaction description.'
          }]

    })
})


module.exports = router;