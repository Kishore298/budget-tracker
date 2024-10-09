import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');  

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (amount === '' || category === '') {
      setError('All fields are required.');
      return; 
    }

    if (Number(amount) === 0) {
      setError('Amount must be greater or less than zero.');
      return;
    }

    const newTransaction = {
      amount: +amount,
      category, 
    };

    console.log('Sending transaction data:', newTransaction);

    addTransaction(newTransaction);
    setError('');
    setAmount('');  
    setCategory('');
  };

  return (
    <>
      <h3>Add new transaction</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="salary">Salary</option>
            <option value="other income">Other Income</option>
            <option value="debt">Debt</option>
            <option value="loan">Loan</option>
            <option value="emergency">Emergency</option>
            <option value="savings">Savings</option>
            <option value="transfer">Transfer</option>
            <option value="investment">Investment</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

