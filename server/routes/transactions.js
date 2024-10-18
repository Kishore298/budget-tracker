const express = require('express');
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactioncontroller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getTransactions)
  .post(protect, addTransaction); 

router.route('/:id')
  .delete(protect, deleteTransaction); 

module.exports = router;
