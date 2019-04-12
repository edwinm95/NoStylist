const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Designer = mongoose.model('designers')

router.get('/all', async function(req,res){
    const designer = await Designer.find()
    res.send(designer)
})

module.exports = router;