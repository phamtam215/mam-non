// Seed data sản phẩm - bám sát bảng giá gốc (images/pata-menu-goc-2000.png).
// `category` nhận giá trị từ data/categories.js: 'kho' | 'rim' | 'mam'.
// Sau khi sửa file này, chạy `npm run seed` để đẩy lên MongoDB.
const { CATEGORY_TYPES } = require('./categories');

const PLACEHOLDER = '/images/placeholder-product.svg';

const seedProducts = [
  // ----- Đặc sản khô -----
  {
    name: 'Cá Chỉ Vàng Khô',
    price: 135000,
    unit: '0.5kg',
    category: 'kho',
    image: '/images/ca-chi-vang-kho.jpg',
    isHot: true
  },
  {
    name: 'Cá Bò Khô',
    price: 160000,
    unit: '0.5kg',
    category: 'kho',
    image: '/images/ca-bo-kho.jpg',
    isHot: true
  },
  {
    name: 'Cá Đét Khô Tẩm Vị',
    price: 160000,
    unit: '0.5kg',
    category: 'kho',
    image: '/images/ca-det-kho-tam-vi.jpg',
    isHot: false
  },
  {
    name: 'Cá Đét Khô Chưa Tẩm',
    price: 148000,
    unit: '0.5kg',
    category: 'kho',
    image: '/images/ca-det-kho-chua-tam.jpg',
    isHot: false
  },
  {
    name: 'Tép Khô',
    price: 95000,
    unit: '0.5kg',
    category: 'kho',
    image: '/images/tep-kho.jpg',
    isHot: false
  },
  {
    name: 'Mực Khô Loại 1',
    price: 800000,
    unit: '0.5kg',
    category: 'kho',
    image: '/images/muc-kho.jpg',
    isHot: true
  },

  // ----- Đặc sản rim -----
  {
    name: 'Cá Cơm Rim',
    price: 135000,
    unit: '0.5kg',
    category: 'rim',
    image: '/images/ca-com-rim.jpg',
    isHot: true
  },
  {
    name: 'Mực Rim',
    price: 268000,
    unit: '0.5kg',
    category: 'rim',
    image: '/images/muc-rim.jpg',
    isHot: true
  },
  {
    name: 'Cá Bò Rim',
    price: 135000,
    unit: '0.5kg',
    category: 'rim',
    image: '/images/ca-bo-rim.jpg',
    isHot: false
  },

  // ----- Nước mắm & mắm ruốc -----
  {
    name: 'Mắm Cá Cơm Đỏ',
    price: 95000,
    unit: '1 lít',
    category: 'mam',
    image: '/images/mam-ca-com-do.jpg',
    isHot: true
  },
  {
    name: 'Mắm Ruốc',
    price: 110000,
    unit: '1 lít',
    category: 'mam',
    image: '/images/mam-ruoc.jpg',
    isHot: false
  }
];

// Chặn sớm lỗi gõ nhầm category thay vì để mongoose báo khi insert.
const invalid = seedProducts.filter(p => !CATEGORY_TYPES.includes(p.category));
if (invalid.length > 0) {
  throw new Error(
    `Seed data có category không hợp lệ: ${invalid.map(p => `${p.name} (${p.category})`).join(', ')}`
  );
}

module.exports = { seedProducts };
