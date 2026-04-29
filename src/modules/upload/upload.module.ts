import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { UploadService } from './upload.service'

@Module({
  imports: [
    // Dùng memoryStorage để Sharp đọc buffer trước khi lưu (không tạo file tạm)
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 } // Tối đa 10MB
    })
  ],
  providers: [UploadService],
  exports: [UploadService, MulterModule]
})
export class UploadModule {}
