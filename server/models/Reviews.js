const mongoose = require('mongoose');
const {Schema} = mongoose;
const reviewSchema = new Schema (
    {
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,

        },
        stars:{
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        item:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'item',
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        },
        read:{
            type: Boolean,
            default: false
        }
        
        }
)
reviewSchema.set('toJSON', {getters: true, virtuals: true})


mongoose.model('reviews',reviewSchema)