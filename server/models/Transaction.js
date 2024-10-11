const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: [true, 'Please enter an amount'],
    },
    category: {
      type: String,
      enum: ['Food','salary','Other Income','Travel', 'Entertainment', 'Utilities', 'Other expenses','Savings','Groceries','Transfer','Investment','Rent','Loan','Dept','Emergency'],
      required: [true, 'Please select a category'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Transaction', TransactionSchema); 