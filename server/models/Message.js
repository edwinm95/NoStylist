const mongoose = require('mongoose')
const {Schema} = mongoose;
const messageSchema = new Schema({
    body:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
messageSchema.set('toJSON', {getters: true, virtuals: true})
mongoose.model('messages',messageSchema)