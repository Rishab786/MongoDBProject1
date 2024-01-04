const mongoose = require('mongoose');
const { Schema } = mongoose;

const expensesSchema = new Schema({
    expenseId :{
        type: Number,
        required: true,
        
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    category: {
        type: String,
        required: true
    },
   amount: {
        type: Number,
        required: true
    },
    product: {
        type: String,
        required: true
    },
   
}
);
module.exports = mongoose.model('Expenses', expensesSchema);