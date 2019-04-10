const mongoose = require('mongoose')
const {Schema} = mongoose
const CategoriesSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        gender:{
            type: String,
            required: true
        }
        
    }
)
mongoose.model('categories',CategoriesSchema)