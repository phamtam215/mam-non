#!/bin/bash
# ============================================================
#  TỐI ƯU ẢNH SẢN PHẨM CHO ĐIỆN THOẠI
# ============================================================
#  Chạy:  npm run optimize-images
#
#  Ảnh sản phẩm hiện là PNG ~1MB/tấm, tổng ~12MB. Trên 4G khách
#  phải chờ rất lâu. Cả 11 ảnh đều KHÔNG dùng kênh trong suốt
#  (đã kiểm tra: alpha đục hoàn toàn) nên chuyển JPEG là an toàn,
#  giảm được khoảng 85-90% dung lượng mà mắt thường không phân biệt.
#
#  Script sẽ:
#    1. Tạo bản .jpg bên cạnh (ảnh .png gốc GIỮ NGUYÊN, không xoá)
#    2. Tự sửa đường dẫn trong data/products.js và frontend/slides.js
#    3. In ra dung lượng trước/sau
#
#  Sau khi chạy xong nhớ:  npm run seed
# ============================================================

set -e
cd "$(dirname "$0")/.."

QUALITY=82      # chất lượng JPEG (0-100), 82 là cân bằng tốt
MAX_SIZE=900    # cạnh dài tối đa, đủ nét cho cả xem phóng to

# Những ảnh KHÔNG đụng tới:
#   - logo:  cần nền trong suốt
#   - menu:  ảnh bảng giá nhiều chữ, PNG nét hơn khi phóng to
SKIP="logo-PATA.png logo-PATA-transparent.png pata-menu-goc-2000.png"

if ! command -v sips >/dev/null 2>&1; then
  echo "❌ Không tìm thấy lệnh sips (chỉ có trên macOS)."
  echo "   Trên Windows/Linux dùng: https://squoosh.app (kéo thả, chọn JPEG q82)"
  exit 1
fi

echo "Đang tối ưu ảnh trong images/ ..."
echo ""

before=0
after=0
count=0

for png in images/*.png; do
  [ -f "$png" ] || continue
  base=$(basename "$png")

  case " $SKIP " in
    *" $base "*) echo "  bỏ qua  $base"; continue ;;
  esac

  jpg="images/${base%.png}.jpg"
  sips -s format jpeg -s formatOptions "$QUALITY" -Z "$MAX_SIZE" "$png" --out "$jpg" >/dev/null 2>&1

  o=$(stat -f%z "$png")
  n=$(stat -f%z "$jpg")
  before=$((before + o))
  after=$((after + n))
  count=$((count + 1))

  printf "  ✓ %-28s %5d KB -> %4d KB  (giảm %2d%%)\n" \
    "$base" $((o / 1024)) $((n / 1024)) $((100 - n * 100 / o))
done

if [ "$count" -eq 0 ]; then
  echo "Không có ảnh nào cần tối ưu."
  exit 0
fi

echo ""
echo "  ----------------------------------------------------"
printf "  TỔNG %d ảnh: %d KB -> %d KB  (giảm %d%%)\n" \
  "$count" $((before / 1024)) $((after / 1024)) $((100 - after * 100 / before))
echo ""

# Đổi .png -> .jpg trong code (chỉ với ảnh vừa convert)
echo "Đang cập nhật đường dẫn trong code..."
for jpg in images/*.jpg; do
  base=$(basename "$jpg" .jpg)
  for f in data/products.js frontend/slides.js; do
    [ -f "$f" ] || continue
    sed -i '' "s|/images/${base}\.png|/images/${base}.jpg|g" "$f"
  done
done
echo "  ✓ data/products.js"
echo "  ✓ frontend/slides.js"

echo ""
echo "XONG. Còn 2 bước:"
echo "  1. npm run seed        (đẩy đường dẫn ảnh mới lên MongoDB)"
echo "  2. Xem lại trang web, nếu ảnh nào bị mờ thì tăng QUALITY trong file này"
echo ""
echo "Ảnh .png gốc vẫn còn nguyên. Ưng rồi thì xoá cho nhẹ repo:"
echo "  rm images/*.png   (nhớ giữ lại logo + pata-menu-goc-2000.png)"
