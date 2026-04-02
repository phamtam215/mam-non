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
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { JwtAuthGuard } from './jwt-auth.guard'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // Dependency Injection: NestJS tự động tạo và inject AuthService vào đây
  // Không cần phải tự new AuthService() thủ công
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Đăng nhập admin' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto.username, signInDto.password)
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin tài khoản đang đăng nhập' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: { userId: number; username: string } }) {
    return req.user
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng xuất (client xóa token)' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout() {
    // JWT là stateless — server không lưu token.
    // Client có trách nhiệm xóa token khỏi storage sau khi nhận response này.
    return { message: 'Đăng xuất thành công' }
  }
}
