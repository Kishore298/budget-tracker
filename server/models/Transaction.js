const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
           text:{
            type:String,
            trim:true,
            required:[true,'please add a text']
           },
           amount:{
            type:Number,
            required:[true,'please enter an amount']
           },
           createdAt:{
            type:Date,
            default:Date.now
           }
});

module.exports = mongoose.model('Transaction',TransactionSchema);