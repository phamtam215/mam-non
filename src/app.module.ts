import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'

/**
 * AppModule là "root module" — điểm khởi đầu của toàn bộ ứng dụng NestJS.
 *
 * Trong Express bạn thường có 1 file app.js để require tất cả router/middleware.
 * Ở NestJS, @Module() đóng vai trò tương tự: khai báo mọi thứ ứng dụng cần dùng.
 *
 * @Module nhận vào một object với 3 trường chính:
 *   - imports:     Các module khác mà module này phụ thuộc vào
 *   - controllers: Xử lý HTTP request (tương đương router trong Express)
 *   - providers:   Các service/class có thể được inject vào bất kỳ đâu (Dependency Injection)
 */
@Module({
  // Import PrismaModule để toàn bộ app có thể dùng PrismaService
  // (vì PrismaModule được đánh dấu @Global, chỉ cần import 1 lần ở đây)
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
