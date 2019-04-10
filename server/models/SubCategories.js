var mongoose = require('mongoose')
var {Schema} = mongoose
var SubCategories = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        category:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'categories',
                required: true
        }
    }
)

mongoose.model('subcategories',SubCategories)