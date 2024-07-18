const mongoose = require('mongoose');
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then((con) => {
        console.log('MongoDB connected to host:' +con.connection.host);
      })
    }
module.exports = connectDB;