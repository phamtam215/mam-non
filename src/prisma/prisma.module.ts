import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'

/**
 * @Global() — Đặt module này là "global", nghĩa là sau khi import vào AppModule
 * thì tất cả các module khác đều có thể dùng PrismaService mà KHÔNG cần import lại.
 * Tương tự như khi bạn gắn prisma client vào app.locals trong Express:
 *   app.locals.prisma = new PrismaClient()
 *
 * @Module():
 *   - providers: Đăng ký PrismaService để NestJS biết cách tạo và quản lý instance của nó
 *   - exports:   Cho phép các module khác dùng PrismaService thông qua Dependency Injection
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
