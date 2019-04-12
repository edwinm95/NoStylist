const mongoose = require('mongoose')
const { Schema } = mongoose
var ConditionSchema = new Schema ({
    name:{
        type: String,
        required: true
    }
})
mongoose.model('conditions',ConditionSchema)