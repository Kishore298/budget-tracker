const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/Db');

dotenv.config({path:'./config/config.env'});

connectDB();

const transactions = require('./routes/transactions');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use('/api/v1/transactions',transactions);
app.use('/api/v1/auth', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT,console.log(`server running on port ${PORT}`.yellow.bold));
