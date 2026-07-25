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
- Lọc theo danh mục (`all`, `kho`, `rim`, `mam`)

## Chạy
1. Tạo file `.env` ở thư mục gốc với nội dung:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/hai-san-pata
   PORT=3000
   ```
   Nếu dùng MongoDB Atlas thì thay bằng chuỗi `mongodb+srv://...`
2. Đảm bảo MongoDB đang chạy
3. Cài package:
   - `npm install`
4. Nạp dữ liệu sản phẩm vào MongoDB:
   - `npm run seed`
5. Chạy app:
   - `npm run dev`
6. Mở trình duyệt:
   - `http://localhost:3000`

## Seed dữ liệu sản phẩm

Danh mục sản phẩm được định nghĩa ở `data/categories.js` với 3 loại (`type`):

| type  | Tên hiển thị          |
|-------|-----------------------|
| `kho` | Đặc sản khô           |
| `rim` | Đặc sản rim           |
| `mam` | Nước mắm & mắm ruốc   |

Danh sách sản phẩm nằm ở `data/products.js`, mỗi món có `category` là một trong 3 `type` trên.

**Cách áp dụng dữ liệu mới vào MongoDB:**

```bash
npm run seed
```

Lệnh này **xoá sạch collection `products` cũ** rồi nạp lại toàn bộ từ `data/products.js`,
sau đó in ra danh sách theo từng loại để đối chiếu với bảng giá gốc.

> Bắt buộc chạy `npm run seed` sau khi đổi danh mục, vì dữ liệu cũ dùng
> `category: 'fresh'/'dried'` sẽ không khớp với các tab khô/rim/mắm.
>
> `server.js` cũng tự phát hiện dữ liệu cũ khi khởi động và nạp lại seed,
> nhưng chạy tay `npm run seed` là cách chắc chắn nhất.

**Thêm/sửa sản phẩm:** sửa `data/products.js` rồi chạy lại `npm run seed`.
Món chưa có ảnh thật thì để `image: PLACEHOLDER`, ảnh sẽ hiện placeholder cho tới khi thay ảnh mới.

## API
- `GET /api/products`
- `GET /api/products?search=mực`
- `GET /api/products?category=kho`
- `GET /api/products?search=cá&category=rim`

## Cấu trúc
- `server.js`: khởi tạo app + serve static + seed dữ liệu mặc định
- `config/db.js`: kết nối MongoDB
- `models/Product.js`: Product schema
- `controllers/productController.js`: logic query
- `routes/productRoutes.js`: route API
- `data/categories.js`: định nghĩa 3 loại sản phẩm (kho/rim/mam)
- `data/products.js`: seed data sản phẩm
- `scripts/seed.js`: script nạp seed vào MongoDB
- `index.html`: shell frontend
- `frontend/app.js`: state + call API
- `frontend/components/*`: UI components
- `assets/styles.css`: style landing page
