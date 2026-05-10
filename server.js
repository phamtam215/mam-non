const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');
const { seedProducts } = require('./data/products');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve toàn bộ thư mục hiện tại
app.get('/api/config', (req, res) => {
  res.json({ port: PORT });
});
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No Content
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Lỗi máy chủ nội bộ'
  });
});

const PORT = Number(process.env.PORT) || 3000;

// Chỉ chạy bootstrap nếu không phải Vercel environment
if (process.env.VERCEL !== '1') {
  async function bootstrap() {
    await connectDB();

    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(seedProducts);
      console.log('Đã tải sẵn sản phẩm mặc định');
    }

    app.listen(PORT, () => {
      console.log(`Server chạy tại http://localhost:${PORT}`);
    });
  }

  bootstrap();
} else {
  // Vercel environment - khởi tạo database khi cần
  connectDB().catch(err => console.error('DB connection error:', err));
}

// Export app cho Vercel serverless
module.exports = app;
