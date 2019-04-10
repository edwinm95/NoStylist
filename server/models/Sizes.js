const mongoose = require('mongoose')
const {Schema} = mongoose
const SubCategory = mongoose.model('subcategories')
const sizesSchema = new Schema({
    
    size:{
        type: String,
        required: true
    },
    subcategories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subcategories'
        }
    ]


})
mongoose.model('sizes',sizesSchema)