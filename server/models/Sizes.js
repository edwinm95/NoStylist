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
sizesSchema.statics.findBySubCategoryID =  function(id,callback){
    var query = this.find()
    SubCategory.findById(id, function(error,sub){
        query.where({subcategories: sub._id}).exec(callback);
    })
    return query;
}
mongoose.model('sizes',sizesSchema)