const mongoose = require('mongoose')
const {Schema} = mongoose;
const messageThreadSchema = new Schema({})
messageThreadSchema.set('toJSON', {getters: true, virtuals: true})
mongoose.model('messagethreads',messageThreadSchema)