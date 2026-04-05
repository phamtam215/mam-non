import { Injectable, BadRequestException } from '@nestjs/common'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'
import { randomUUID } from 'crypto'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_WIDTH = 1200
const QUALITY = 80

@Injectable()
export class UploadService {
  /**
   * Xử lý ảnh upload: validate, rename (UUID), resize & nén bằng Sharp, lưu vào thư mục tương ứng.
   * @param file   File từ Multer (buffer)
   * @param folder 'posts' | 'library'
   * @returns URL tương đối dùng trong DB, ví dụ: /uploads/posts/uuid.webp
   */
  async saveImage(file: Express.Multer.File, folder: 'posts' | 'library'): Promise<string> {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Chỉ chấp nhận ảnh định dạng JPG, PNG hoặc WEBP')
    }

    const uploadDir = join(process.cwd(), 'uploads', folder)
    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

    const filename = `${Date.now()}-${randomUUID()}.webp`
    const outputPath = join(uploadDir, filename)

    await sharp(file.buffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath)

    return `/uploads/${folder}/${filename}`
  }
}
