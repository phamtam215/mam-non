import { Injectable } from '@nestjs/common'
// AuthGuard là factory function của @nestjs/passport
// Truyền vào tên strategy ('jwt') để nó biết dùng JwtStrategy để xác thực
import { AuthGuard } from '@nestjs/passport'

// @Injectable() để NestJS có thể inject Guard này vào bất kỳ đâu
@Injectable()
// extends AuthGuard('jwt'): kế thừa toàn bộ logic xác thực JWT
// Khi một route dùng @UseGuards(JwtAuthGuard), NestJS sẽ:
//   1. Lấy token từ header Authorization: Bearer <token>
//   2. Verify token bằng secret key
//   3. Nếu hợp lệ → gọi JwtStrategy.validate() → gán kết quả vào req.user
//   4. Nếu không hợp lệ → tự động trả về 401 Unauthorized
export class JwtAuthGuard extends AuthGuard('jwt') {}
