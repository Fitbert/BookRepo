const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

module.exports = mongoose.connection;
