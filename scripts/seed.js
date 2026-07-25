require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { seedProducts } = require('../data/products');
const { CATEGORIES } = require('../data/categories');

function formatPrice(price) {
  return Number(price).toLocaleString('vi-VN');
}

// Đồng bộ index của collection về đúng những gì schema khai báo,
// đồng thời báo rõ index nào bị xoá để dễ đối chiếu khi có lỗi E11000.
async function syncIndexes() {
  let before = [];
  try {
    before = (await Product.collection.indexes()).map(index => index.name);
  } catch (err) {
    // Collection chưa tồn tại (DB mới tinh) - không có index nào để dọn.
  }

  await Product.syncIndexes();

  const after = (await Product.collection.indexes()).map(index => index.name);
  const dropped = before.filter(name => !after.includes(name));

  if (dropped.length > 0) {
    console.log(`Đã xoá ${dropped.length} index cũ không còn trong schema: ${dropped.join(', ')}`);
  }
  console.log(`Index hiện tại: ${after.join(', ')}`);
}

async function seed() {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('Thiếu MONGO_URI trong biến môi trường (tạo file .env từ .env.example)');
    }

    console.log('Đang kết nối MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB đã kết nối ✓');

    const oldCount = await Product.countDocuments();
    await Product.deleteMany({});
    console.log(`Đã xóa ${oldCount} sản phẩm cũ`);

    // deleteMany chỉ xoá document, KHÔNG xoá index. Schema cũ có thể để lại
    // unique index mồ côi (vd: slug_1) khiến insert lỗi E11000 dup key slug:null.
    // syncIndexes xoá index không còn trong schema và tạo index còn thiếu.
    await syncIndexes();

    const result = await Product.insertMany(seedProducts);
    console.log(`✓ Đã thêm ${result.length} sản phẩm vào database\n`);

    // In lại theo từng loại để dễ đối chiếu với bảng giá gốc.
    CATEGORIES.forEach(({ type, label }) => {
      const items = result.filter(product => product.category === type);
      console.log(`${label} (${items.length} món):`);
      items.forEach(product => {
        const hot = product.isHot ? ' [BÁN CHẠY]' : '';
        console.log(`  - ${product.name}: ${formatPrice(product.price)}đ/${product.unit}${hot}`);
      });
      console.log('');
    });

    await mongoose.connection.close();
    console.log('Hoàn tất! MongoDB connection đã đóng.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
  }
}

seed();
