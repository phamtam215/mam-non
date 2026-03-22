// Module là đơn vị tổ chức code trong NestJS, giống như "gói" chứa mọi thứ liên quan đến auth
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'

// @Module() khai báo metadata cho module:
// - imports: các module bên ngoài cần dùng (ở đây là JwtModule để tạo và verify token)
// - providers: các Service sẽ được inject (tạo instance và quản lý bởi NestJS)
// - controllers: các Controller nhận request từ client
@Module({
  imports: [
    // JwtModule.register() cấu hình JWT toàn cục cho toàn bộ ứng dụng
    JwtModule.register({
      global: true, // true = các module khác không cần import lại JwtModule nữa
      secret: 'SECRET_KEY_KHONG_DUOC_DE_LO', // Sau này nên để vào file .env
      signOptions: { expiresIn: '1d' } // Token có hạn trong 1 ngày
    })
  ],
  providers: [AuthService, JwtStrategy], // Đăng ký AuthService và JwtStrategy để NestJS quản lý và inject khi cần
  controllers: [AuthController] // Đăng ký AuthController để NestJS biết route nào cần xử lý
})
export class AuthModule {}
