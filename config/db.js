const mongoose = require('mongoose');

async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error('Thiếu MONGO_URI trong biến môi trường');
  }

  await mongoose.connect(mongoURI);
  console.log('MongoDB đã kết nối');
}

module.exports = connectDB;
