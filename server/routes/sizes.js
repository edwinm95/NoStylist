const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Size = mongoose.model('sizes')
const SubCategory = mongoose.model('subcategories')

router.post('/addSize', async function(req,res){
    const {size,subcategories} = req.body
    const array = []
    for(var i = 0; i < subcategories.length; i++){
        const id = subcategories[i];
        const sub = await SubCategory.findById(id)
        array.push(sub);
    }
    const newSize = new Size({
        size: size,
        subcategories: array
    })
    console.log(newSize)
    newSize.save();
    res.send('Success')

})

module.exports = router;