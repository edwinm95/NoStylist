const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const {Schema} = mongoose;
const userSchema = new Schema (
    {
        google:{
            type:{
                id: String,
                unique: true
            },
            select: false
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        name:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        facebook:{
            type:{
                id: String,
                unique: true
            },
            select: false
        },

        createdAt:{
            type: Date,
            default: Date.now
        },
        reviews:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reviews'

        }],
        followers:[
            {type: mongoose.Schema.Types.ObjectId,
            ref: 'users'}
        ],
        items:[{
            type: mongoose.Schema.Types.Number,
            ref: 'items'
            }
        ]
        
        }
)
userSchema.set('toJSON', {getters: true, virtuals: true})


mongoose.model('users',userSchema)
