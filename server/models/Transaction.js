const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please enter an amount'],
  },
  category: {
    type: String,
    enum: ['Food', 'Salary', 'Other Income', 'Travel', 'Entertainment', 'Utilities', 'Other Expenses', 'Savings', 'Groceries', 'Transfer', 'Investment', 'Rent', 'Loan', 'Debt', 'Emergency'],
    required: [true, 'Please select a category'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
