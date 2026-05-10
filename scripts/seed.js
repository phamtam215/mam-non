require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { seedProducts } = require('../data/products');

async function seed() {
  try {
    cost mongoURI="mongodb+srv://admin:123@pre-school-cluster-0.gz9nzxp.mongodb.net/sea-food?appName=pre-school-cluster-0"
    if (!mongoURI) {
      throw new Error('Thiếu MONGO_URI trong biến môi trường');
    }

    console.log('Đang kết nối MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB đã kết nối ✓');

    // Xóa dữ liệu cũ (tùy chọn)
    await Product.deleteMany({});
    console.log('Đã xóa dữ liệu cũ');

    // Thêm dữ liệu mới
    const result = await Product.insertMany(seedProducts);
    console.log(`✓ Đã thêm ${result.length} sản phẩm vào database`);

    result.forEach(product => {
      console.log(`  - ${product.name} (${product.price}đ/${product.unit})`);
    });

    await mongoose.connection.close();
    console.log('\nHoàn tất! MongoDB connection đã đóng.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
}

seed();
