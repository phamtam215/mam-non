// Nguồn dữ liệu chuẩn (single source of truth) cho các loại sản phẩm.
// `type` chính là giá trị lưu ở field `category` của Product trong MongoDB.
// Dùng chung cho: seed data, Product model (enum) và API filter.
const CATEGORIES = [
  { type: 'kho', label: 'Đặc sản khô', badge: 'ĐẶC SẢN KHÔ' },
  { type: 'rim', label: 'Đặc sản rim', badge: 'ĐẶC SẢN RIM' },
  { type: 'mam', label: 'Nước mắm & mắm ruốc', badge: 'MẮM & NƯỚC MẮM' }
];

const CATEGORY_TYPES = CATEGORIES.map(category => category.type);

function getCategoryLabel(type) {
  const found = CATEGORIES.find(category => category.type === type);
  return found ? found.label : type;
}

module.exports = { CATEGORIES, CATEGORY_TYPES, getCategoryLabel };
