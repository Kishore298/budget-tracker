import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
  const balanceColor = total < 0 ? 'red' : 'green';

  return (
    <>
      <h4 style={{ color: balanceColor }}>Your Balance</h4>
      <h1 style={{ color: balanceColor }}>${numberWithCommas(total)}</h1>
    </>
  );
};
