import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Mã hóa mật khẩu: Admin@123
  const hashedPassword = await bcrypt.hash('Admin@123', 10)

  // Tạo tài khoản admin nếu chưa tồn tại
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: 'Quản trị viên Hồng Nhung'
    }
  })

  console.log('✅ Đã tạo tài khoản Admin mặc định!')
  console.log('Username: admin')
  console.log('Password: Admin@123')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
