// ============================================================
//  DANH SÁCH SLIDE QUẢNG CÁO ĐẦU TRANG
// ============================================================
//
//  CÁCH THÊM SLIDE MỚI:
//    1. Copy file ảnh vào thư mục  images/
//    2. Thêm một khối { ... } vào mảng SLIDES bên dưới
//    3. Lưu file - không cần build lại, chỉ cần F5 trình duyệt
//
//  Thứ tự trong mảng = thứ tự chạy slide.
//
//  ---------- CÁC Ô CÓ THỂ ĐIỀN ----------
//
//    image  (bắt buộc) Đường dẫn ảnh, bắt đầu bằng /images/
//    alt    (bắt buộc) Mô tả ảnh - quan trọng cho SEO + người khiếm thị
//
//    title  (tuỳ chọn) TIÊU ĐỀ quảng cáo, hiện to bên cạnh ảnh
//    text   (tuỳ chọn) NỘI DUNG NGẮN, nên 1-2 câu cho gọn
//    cta    (tuỳ chọn) Nút bấm: { label: 'chữ trên nút', href: 'liên kết' }
//
//  >> Slide CÓ title/text  -> ảnh nằm bên trái, chữ nằm bên phải
//  >> Slide KHÔNG có chữ   -> ảnh hiện to chính giữa (hợp với ảnh bảng giá)
//
//  Ảnh nên để bề ngang >= 1200px. Tỉ lệ nào cũng được: slider dùng
//  object-fit contain nên ảnh luôn hiện trọn vẹn, không bị cắt chữ.
//
export const SLIDES = [
  {
    // Slide bảng giá: cố ý KHÔNG có title/text để ảnh hiện to nhất.
    image: '/images/pata-menu-goc-2000.png',
    alt: 'Bảng giá tổng hợp đặc sản khô và rim PATA Đà Nẵng - mực khô, cá bò khô, cá chỉ vàng, cá cơm rim, mắm ruốc',
    isMenu: true
  },
  {
    image: '/images/muc-kho.jpg',
    alt: 'Mực khô loại 1 Đà Nẵng - đặc sản khô PATA',
    title: 'Mực Khô Loại 1',                                  // <-- sửa tiêu đề ở đây
    text: 'Mực câu tươi phơi đủ nắng, thịt dày ngọt tự nhiên. Nướng lên thơm lừng, không chất bảo quản.', // <-- sửa nội dung ở đây
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  },
  {
    image: '/images/ca-bo-kho.jpg',
    alt: 'Cá bò khô tẩm vị - đặc sản khô Đà Nẵng PATA',
    title: 'Cá Bò Khô Tẩm Vị',
    text: 'Đậm đà cay nhẹ, xé sợi ăn liền. Món nhậu và quà biếu được chuộng nhất tại Đà Nẵng.',
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  },
  {
    image: '/images/ca-com-rim.jpg',
    alt: 'Cá cơm rim mặn ngọt - đặc sản rim Đà Nẵng PATA',
    title: 'Cá Cơm Rim Mè',
    text: 'Rim mặn ngọt chuẩn vị nhà làm, rắc mè rang thơm. Ăn với cơm nóng là hết veo.',
    cta: { label: 'Đặt hàng ngay', href: 'tel:0764933884' }
  }
];

// Thời gian mỗi slide đứng yên trước khi chuyển (mili giây).
export const SLIDE_INTERVAL = 2000;
