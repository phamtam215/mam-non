// Injectable: đánh dấu class này có thể được inject vào nơi khác (Controller, Service khác...)
// UnauthorizedException: exception có sẵn của NestJS, tự động trả về HTTP 401
import { Injectable, UnauthorizedException } from '@nestjs/common'
// PrismaService: service tuỳ chỉnh giúp kết nối và truy vấn database qua Prisma ORM
import { PrismaService } from '../../prisma/prisma.service'
// JwtService: service của @nestjs/jwt, dùng để tạo và verify JWT token
import { JwtService } from '@nestjs/jwt'
// bcrypt: thư viện hash mật khẩu — không bao giờ lưu mật khẩu thô vào DB
import * as bcrypt from 'bcrypt'

// @Injectable() cho phép NestJS tự động tạo instance và quản lý vòng đời của class này
@Injectable()
export class AuthService {
  // ===== DEPENDENCY INJECTION QUA CONSTRUCTOR =====
  // Thay vì tự tạo object thủ công như thế này:
  //   this.prisma = new PrismaService()
  //   this.jwtService = new JwtService()
  //
  // Ta chỉ cần khai báo trong constructor, NestJS sẽ tự động:
  //   1. Tạo instance của PrismaService và JwtService (hoặc tái sử dụng nếu đã có)
  //   2. Truyền chúng vào đây khi AuthService được khởi tạo
  //
  // Từ khoá "private" vừa khai báo property, vừa gán giá trị — tương đương viết:
  //   private prisma: PrismaService
  //   private jwtService: JwtService
  //   constructor(prisma: PrismaService, jwtService: JwtService) {
  //     this.prisma = prisma
  //     this.jwtService = jwtService
  //   }
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(username: string, pass: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { username }
    })

    if (!admin || !(await bcrypt.compare(pass, admin.password))) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng')
    }

    // 3. Tạo JWT Token
    // payload là dữ liệu được nhúng vào token (không bỏ thông tin nhạy cảm như password vào đây)
    // "sub" (subject) là convention của JWT, thường chứa user ID
    const payload = { sub: admin.id, username: admin.username }
    return {
      // signAsync() tạo token từ payload + ký bằng secret key đã cấu hình trong AuthModule
      access_token: await this.jwtService.signAsync(payload),
      // Trả thêm thông tin user cơ bản để client hiển thị (ví dụ: tên trên navbar)
      user: {
        name: admin.name,
        username: admin.username
      }
    }
  }
}
