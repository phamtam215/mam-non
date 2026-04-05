/**
 * Chuyển đổi chuỗi tiếng Việt sang slug SEO-friendly
 * Ví dụ: "Trường tổ chức lễ hội trung thu 2025" -> "truong-to-chuc-le-hoi-trung-thu-2025"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Đảm bảo slug là duy nhất bằng cách thêm hậu tố số nếu trùng
 */
export function makeUniqueSlug(slug: string, suffix: number): string {
  return suffix === 0 ? slug : `${slug}-${suffix}`
}
