# Hải Sản PATA Landing Page (Vue + Node + MongoDB)

## Stack
- Frontend: Vue 3 (component modules, no build step)
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Tính năng
- Landing page layout theo mockup xanh biển
- API chung với frontend trong cùng project
- Lấy danh sách món ăn (ảnh + tên + giá) từ MongoDB
- Tìm kiếm theo tên món (`search` query)
- Lọc theo danh mục (`all`, `fresh`, `dried`)

## Chạy
1. Tạo file `.env` từ `.env.example`
2. Đảm bảo MongoDB đang chạy
3. Cài package:
   - `npm install`
4. Chạy app:
   - `npm run dev`
5. Mở trình duyệt:
   - `http://localhost:3000`

## API
- `GET /api/products`
- `GET /api/products?search=mực`
- `GET /api/products?category=fresh`
- `GET /api/products?search=cá&category=dried`

## Cấu trúc
- `server.js`: khởi tạo app + serve static + seed dữ liệu mặc định
- `config/db.js`: kết nối MongoDB
- `models/Product.js`: Product schema
- `controllers/productController.js`: logic query
- `routes/productRoutes.js`: route API
- `data/products.js`: seed data
- `index.html`: shell frontend
- `frontend/app.js`: state + call API
- `frontend/components/*`: UI components
- `assets/styles.css`: style landing page
