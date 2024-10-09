import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { Incomeexpense } from './components/Incomeexpense';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/Addtransaction';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <Incomeexpense />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;






