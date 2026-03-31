import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Thêm dòng này để chặn mọi request sai định dạng DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu gửi dư thừa field
      transform: true // Tự động convert kiểu dữ liệu
    })
  )

  await app.listen(3000)
}
bootstrap()
