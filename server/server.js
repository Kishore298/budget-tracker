const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/Db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');
const auth = require('./routes/auth'); 

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/transactions', transactions);
app.use('/api/v1/auth', auth); 

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
