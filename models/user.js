const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    role:{
        //means registered user is seller or buyer;
        type:String,
        default:"buyer"
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
    ,
    Cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    

});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);

module.exports = User;