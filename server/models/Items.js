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
    designer:{
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
    shippinglocation:{
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
    paypal:{
        type: String,
        required: true
    },
    shipping:{
        type:Number,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    photo1:{
        type: String,
        required: true
    },
    photo2:{
        type: String,
    },
    photo3:{
        type: String,
    },
    photo4:{
        type: String,
    },
    photo5:{
        type: String,
    },
    photo6:{
        type: String,
    }

})
itemSchema.set('toJSON', {getters: true, virtuals: true})
mongoose.model('items', itemSchema)