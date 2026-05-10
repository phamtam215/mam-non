const mongoose = require('mongoose');

let dbConnected = false;

async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error('Thiếu MONGO_URI trong biến môi trường');
    throw new Error('Thiếu MONGO_URI trong biến môi trường');
  }

  if (dbConnected) {
    console.log('Database đã được kết nối trước đó');
    return;
  }

  try {
    await mongoose.connect(mongoURI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 5000,
    });
    dbConnected = true;
    console.log('MongoDB đã kết nối thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error.message);
    throw error;
  }
}

module.exports = connectDB;
