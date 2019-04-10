const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const path = require('path')
const Category = mongoose.model('categories')
const SubCategory = mongoose.model('subcategories')
const Type = mongoose.model('types')
router.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/addCategories.html'))
})
router.post('/new', async function(req,res){
    const {category, gender} = req.body
    const newCategory = await new Category({
        name: category,
        gender: gender
    })
    newCategory.save();
    res.send('Success')
})
router.get('/getCategory',async function(req,res){
    const category = await Category.find()
    res.send(category);
})
router.get('/getsubcategory', async function(req,res){
    const sub = await SubCategory.find()
    res.send(sub)
})
router.post('/findsubcategory', async function(req,res){
    const {id} = req.body
    const category = await Category.findById(id)
    const sub = await SubCategory.find({category: category})
    res.send(sub)
})


router.get('/getSub', async function(req,res){
    const subcategory = await Category.find()
    res.send(subcategory)
})

router.get('/gettype', async function(req,res){
    const type = await Type.find()
    res.send(type)
})
router.post('/addtype', async function(req,res){
    const {type, subcategory} = req.body;
    console.log(subcategory)
    try{
        const subcategoryInfo = await SubCategory.findById(subcategory)
        console.log(subcategoryInfo)
        const newType = await new Type({
            name: type,
            subcategory: subcategory
        })
        newType.save();
        res.send('Succes');

    }catch(error){
        res.send('Fail')
    }

})

router.get('/addsub', function(req,res){
    res.sendFile(path.join(__dirname+'/addSub.html'))
})
router.post('/createsub', async function(req,res){
    try{
        const {subcategory, categories, gender} = req.body
        const getCategory = await Category.findOne({name: categories, gender: gender})
        const newSubCategory = await new SubCategory({
            name: subcategory,
        })
        console.log(getCategory)
        newSubCategory.category = getCategory.id
        newSubCategory.save();
        res.send('Success')
    }catch(error){
        res.send(error)
    }
})


module.exports = router;