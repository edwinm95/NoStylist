const mongoose = require('mongoose');
const {Schema} = mongoose;
const User = mongoose.model('users')
const reviewSchema = new Schema (
    {
        user:{
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

reviewSchema.statics.findByUsername = function (username, callback) {
    var query = this.findOne()
  
    User.findOne({'username': username}, function (error, user) {
      query.where(
        {user: user._id}
      ).exec(callback);
    })
    return query
  }

mongoose.model('reviews',reviewSchema)