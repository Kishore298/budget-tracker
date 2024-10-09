const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: [true, 'Please enter an amount'],
    },
    category: {
      type: String,
      enum: ['Food', 'Travel', 'Entertainment', 'Utilities', 'Other'],
      required: [true, 'Please select a category'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model('Transaction', TransactionSchema); 