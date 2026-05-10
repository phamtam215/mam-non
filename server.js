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
app.use(express.static(path.join(__dirname, '.')));

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/api/config', (req, res) => {
  res.json({ port: PORT });
});
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Lỗi máy chủ nội bộ'
  });
});

const PORT = Number(process.env.PORT) || 3000;

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
  connectDB().catch(err => console.error('DB connection error:', err));
}

module.exports = app;
