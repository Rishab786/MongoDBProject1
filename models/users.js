const Expenses = require('./expenses');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalexpenses: {
        type: Number,
        default: 0
    },
    ispremiumuser: {
        type: Boolean,
        default: false
    },
    downloadUrl: [{
        url:{
            type:String
        },
        createdAt:{
            type:Date,
        }
}],
    
    order: {
        order_id:{
            type:String
        },
        status:{
            type:String
        },
        payment_id:{
            type:String
        },
        createdAt:{
            type:Date
        }
    }
});

module.exports = mongoose.model('User', userSchema);