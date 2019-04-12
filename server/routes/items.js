var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Item = mongoose.model('items')
const Condition = mongoose.model('conditions')
const multer = require('multer')
const upload = require('../utils/storageMulter');
const mv = require('mv')
var fs = require('fs')

router.post('/new', (req,res) => {
     upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).send({error: err})
        } else if (err) {
            return res.status(500).send({error: err})
        }
        const photo1 = req.files.photo1 ? req.files.photo1[0].filename : null;
        const photo2 = req.files.photo2 ? req.files.photo2[0].filename : null;
        const photo3 = req.files.photo3 ? req.files.photo3[0].filename : null;
        const photo4 = req.files.photo4 ? req.files.photo4[0].filename : null;
        const photo5 = req.files.photo5 ? req.files.photo5[0].filename : null;
        const photo6 = req.files.photo6 ? req.files.photo6[0].filename : null;
        if(photo1 === null){
            return res.status(500).send({error: 'Photo 1 is required'})
        }
        const {itemname,category,designer,size,description,price,shippinglocation,shipping,condition,paypal} = req.body;
        const newItem = await new Item(
            {
                name: itemname,
                description: description,
                designer: designer,
                category: category,
                size: size,
                price: price,
                shippinglocation: shippinglocation,
                condition: condition,
                shipping: shipping,
                paypal: paypal
            }
        );
        newItem.user = req.user;
        newItem.photo1 = photo1;
        newItem.photo2 = photo2;
        newItem.photo3 = photo3;
        newItem.photo4 = photo4;
        newItem.photo5 = photo5;
        newItem.photo6 = photo6;
        
        try{
            newItem.save();

        }catch(error){
            return res.status(500).send({error: error})
        }
        const imageDir = `public/images/item/${newItem.id}`
        if(!fs.existsSync(imageDir)){
            fs.mkdirSync(imageDir)
        }
        const uploadDir = 'temp/multer/itemuploads'
        var files = [photo1, photo2, photo3, photo4, photo5, photo6]
        for(var i = 0; i < files.length; i++){
            var photo = files[i];
            if(photo != null){
                    mv(`${uploadDir}/${photo}`,`${imageDir}/${photo}` ,function(error){
                        if(error){
                            return res.status(500).send({error: error})
                        }
                    })

            }
        }
        
        return res.status(200).send({item: newItem})


    })

})
router.get('/all', async (req,res) => {
    var item = await Item.find();
    res.send(item);
})
router.post('/find', async (req,res) => {
   const {id} = req.body
   var item = await Item.findById(id)
   res.send(item)
})

router.get('/getconditions', async (req,res) => {
    const condition = await Condition.find()
    console.log(condition)
    res.send(condition)
})

module.exports = router;