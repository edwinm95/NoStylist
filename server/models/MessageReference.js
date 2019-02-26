const mongoose = require('mongoose')
const {Schema} = mongoose;
const messageRefernceSchema = new Schema({
    mesage_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messages',
        type: required
    },
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true

    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true

    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
    }
})
messageRefernceSchema.set('toJSON', {getters: true, virtuals: true})
mongoose.model('messageReference',messageRefernceSchema)