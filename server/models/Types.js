const mongoose = require('mongoose')
const {Schema} = mongoose
const typeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    subcategory:{
        type: mongoose.Types.ObjectId,
        ref: 'subcategories',
        required: true
    }
})
mongoose.model('types',typeSchema)