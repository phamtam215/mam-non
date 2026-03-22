// passport-jwt: thư viện xử lý JWT authentication theo chuẩn Passport.js
// Strategy: class chứa logic xác thực JWT (verify token, giải mã payload)
import { ExtractJwt, Strategy } from 'passport-jwt'
// PassportStrategy: helper của NestJS để tích hợp Passport strategy vào hệ thống DI
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

// @Injectable() để NestJS quản lý vòng đời và cho phép đăng ký trong providers
@Injectable()
// PassportStrategy(Strategy) là mixin pattern:
//   - Strategy (từ passport-jwt): chứa logic verify JWT
//   - PassportStrategy: wrap lại để tương thích với NestJS
// Tên mặc định của strategy này là 'jwt', khớp với AuthGuard('jwt') trong jwt-auth.guard.ts
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // super() truyền cấu hình vào Strategy cha
    super({
      // Lấy token từ header "Authorization: Bearer <token>"
      // Client phải gửi header này theo đúng format
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // false = báo lỗi nếu token đã hết hạn (không bỏ qua expiration)
      ignoreExpiration: false,
      // Key dùng để verify chữ ký của token — phải khớp với secret trong AuthModule
      // Nếu khác nhau, token sẽ bị coi là giả mạo và verify thất bại
      secretOrKey: 'SECRET_KEY_KHONG_DUOC_DE_LO'
    })
  }

  // Định nghĩa kiểu rõ ràng cho payload thay vì dùng any
  // Khớp với những gì đã ký trong AuthService: { sub: admin.id, username: admin.username }
  validate(payload: { sub: number; username: string }) {
    // Không cần async vì không có thao tác bất đồng bộ nào ở đây
    // Giá trị trả về sẽ được NestJS gán vào request.user để dùng ở controller
    return { userId: payload.sub, username: payload.username }
  }
}
