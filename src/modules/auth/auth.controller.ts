import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

// @Controller('auth') nghĩa là tất cả các route trong class này
// đều có prefix là /auth. Ví dụ: POST /auth/login
@Controller('auth')
export class AuthController {
  // Dependency Injection: NestJS tự động tạo và inject AuthService vào đây
  // Không cần phải tự new AuthService() thủ công
  constructor(private authService: AuthService) {}
  // @HttpCode(HttpStatus.OK): ghi đè status code mặc định của POST (201) thành 200
  // vì đây là hành động login, không tạo resource mới
  @HttpCode(HttpStatus.OK)
  // @Post('login'): xử lý HTTP POST /auth/login
  @Post('login')
  // @Body() tự động parse JSON body của request thành object
  // LoginDto thay thế cho Record<string, any>: định nghĩa rõ body phải có username và password
  // Kết hợp với ValidationPipe (cấu hình trong main.ts), NestJS sẽ tự động
  // kiểm tra dữ liệu đầu vào và trả về lỗi 400 nếu client gửi thiếu hoặc sai kiểu
  signIn(@Body() signInDto: LoginDto) {
    // Gọi sang Service để xử lý logic đăng nhập, trả kết quả về cho client
    return this.authService.login(signInDto.username, signInDto.password)
  }

  // @UseGuards(JwtAuthGuard): bảo vệ route này
  // Request không có token hoặc token hết hạn/sai → tự động trả về 401, không vào hàm
  @UseGuards(JwtAuthGuard)
  // @Get('profile'): xử lý HTTP GET /auth/profile
  @Get('profile')
  // @Request() inject toàn bộ HTTP request object vào tham số req
  // Nhờ JwtAuthGuard chạy trước, req.user đã được NestJS gán sẵn
  // với dữ liệu từ JwtStrategy.validate(): { userId, username }
  getProfile(@Request() req: { user: { userId: number; username: string } }) {
    return req.user
  }
}
