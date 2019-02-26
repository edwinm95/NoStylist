const mongoose = require('mongoose')
const {Schema} = mongoose;
const itemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    condition:{
        type:String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    shipping:{
        type:Number,
        required: true
    },
    likes:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})
itemSchema.set('toJSON', {getters: true, virtuals: true})
mongoose.model('items', itemSchema)