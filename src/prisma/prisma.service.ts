import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

/**
 * @Injectable() — Đánh dấu class này là một "Provider".
 * NestJS sẽ tự động tạo instance và inject (truyền) nó vào bất kỳ class nào cần dùng.
 * Trong Express bạn phải truyền prisma thủ công qua tham số hoặc import trực tiếp;
 * ở NestJS chỉ cần khai báo trong constructor là xong.
 *
 * extends PrismaClient — Kế thừa toàn bộ PrismaClient, nên bạn dùng service này
 * y hệt như dùng prisma bình thường: this.user.findMany(), this.post.create()...
 */
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * onModuleInit() — Hook chạy tự động sau khi NestJS khởi tạo xong module.
   * Tương đương với đoạn code bạn đặt sau app.listen() trong Express.
   */
  async onModuleInit() {
    await this.$connect()
    console.log('🚀 Đã kết nối MongoDB Atlas thành công!')
  }

  /**
   * onModuleDestroy() — Hook chạy tự động khi ứng dụng shutdown (Ctrl+C, restart...).
   * Đảm bảo đóng kết nối database sạch sẽ, tránh rò rỉ tài nguyên.
   */
  async onModuleDestroy() {
    await this.$disconnect()
  }
}
