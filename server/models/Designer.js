const mongoose = require('mongoose')
const {Schema} = mongoose
const designerSchema = new Schema({
    Name:{
        type: String,
        required: true
    }
})

mongoose.model('designers',designerSchema)
