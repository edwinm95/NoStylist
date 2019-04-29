const mongoose = require('mongoose')
const {Schema} = mongoose;
const Items = mongoose.model('items')
const messageSchema = new Schema({
    item:{
        type: mongoose.Types.ObjectId,
        refs: 'items',
        required: true
    },
    sender: {
        type: mongoose.Types.ObjectId,
        refs: 'users',
        required: true
    },
    receiver:{
        type: mongoose.Types.ObjectId,
        refs: 'users',
        required: true
    },
    body:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    messagethread:{
        type: mongoose.Types.ObjectId,
        refs: 'messagethreads'
    },
    state:{
        type: String,
        default: 'unread'
    }
})
messageSchema.set('toJSON', {getters: true, virtuals: true})
mongoose.model('messages',messageSchema)