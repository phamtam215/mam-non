import { Injectable, BadRequestException } from '@nestjs/common'
import { existsSync, mkdirSync } from 'fs'
import { join, resolve } from 'path'
import sharp from 'sharp'
import { randomUUID } from 'crypto'

const MAX_WIDTH = 1200
const QUALITY = 80

function isValidImageBuffer(buffer: Buffer): boolean {
  // Kiểm tra JPEG hoặc PNG
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  const isPng =
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  // Kiểm tra WEBP: bytes 0-3 là "RIFF" và bytes 8-11 là "WEBP"
  const isWebp =
    buffer.length > 12 &&
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50

  return isJpeg || isPng || isWebp
}

@Injectable()
export class UploadService {
  private readonly uploadsRoot = resolve(process.cwd(), 'uploads')

  async saveImage(
    file: Express.Multer.File,
    folder: 'posts' | 'library'
  ): Promise<string> {
    // 1. Kiểm tra magic bytes thực tế của file (chống giả mạo MIME type)
    if (!isValidImageBuffer(file.buffer)) {
      throw new BadRequestException(
        'File không phải ảnh hợp lệ (JPG, PNG, WEBP)'
      )
    }

    // 2. Chống path traversal: folder chỉ được là 'posts' hoặc 'library'
    if (folder !== 'posts' && folder !== 'library') {
      throw new BadRequestException('Thư mục không hợp lệ')
    }

    const uploadDir = join(this.uploadsRoot, folder)

    // 3. Đảm bảo uploadDir nằm trong uploadsRoot (double-check path traversal)
    if (!resolve(uploadDir).startsWith(this.uploadsRoot)) {
      throw new BadRequestException('Đường dẫn không hợp lệ')
    }

    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true })

    const filename = `${Date.now()}-${randomUUID()}.webp`
    const outputPath = join(uploadDir, filename)

    // 4. Sharp re-encode: tự động strip toàn bộ EXIF/metadata (GPS, thiết bị...) và chỉ giữ pixel
    await sharp(file.buffer)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath)

    return `/uploads/${folder}/${filename}`
  }
}
