// db.js

const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    );
    console.log('MongoDB is Connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
