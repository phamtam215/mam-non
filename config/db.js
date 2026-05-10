const mongoose = require('mongoose');

async function connectDB() {
  cost mongoURI="mongodb+srv://admin:123@pre-school-cluster-0.gz9nzxp.mongodb.net/sea-food?appName=pre-school-cluster-0"

  if (!mongoURI) {
    throw new Error('Thiếu MONGO_URI trong biến môi trường');
  }

  await mongoose.connect(mongoURI);
  console.log('MongoDB đã kết nối');
}

module.exports = connectDB;
