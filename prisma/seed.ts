import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { generateSlug } from '../src/modules/post/utils/slug.util'

const prisma = new PrismaClient()

async function main() {
  // Xóa dữ liệu cũ
  await prisma.post.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.library.deleteMany()

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

  // Seed bài viết mẫu
  const posts = [
    {
      thumbnail: 'https://placehold.co/800x500?text=Khai+Giang',
      date: new Date('2025-09-05'),
      category: 'Sự kiện',
      title: 'Khai giảng năm học mới 2025-2026',
      content:
        'Khai giảng năm học mới 2025-2026 tại Mầm Non Hồng Nhung. Buổi lễ diễn ra trong không khí ấm áp với nhiều hoạt động ý nghĩa.'
    },
    {
      thumbnail: 'https://placehold.co/800x500?text=Be+Kheo+Tay',
      date: new Date('2025-10-15'),
      category: 'Hoạt động',
      title: 'Hội thi Bé Khéo Tay tháng 10 - Chủ đề Mùa Thu Vàng',
      content:
        'Hội thi Bé Khéo Tay tháng 10 với chủ đề Mùa Thu Vàng. Các bé tạo ra những tác phẩm nghệ thuật tuyệt vời.'
    },
    {
      thumbnail: 'https://placehold.co/800x500?text=Da+Ngoai',
      date: new Date('2025-11-20'),
      category: 'Dã ngoại',
      title: 'Chuyến dã ngoại tham quan vườn thú Thủ Lệ',
      content:
        'Chuyến dã ngoại tham quan vườn thú Thủ Lệ giúp các bé khám phá thế giới động vật phong phú.'
    }
  ]

  for (const post of posts) {
    await prisma.post.create({
      data: { ...post, slug: generateSlug(post.title) }
    })
  }

  console.log(`✅ Đã tạo ${posts.length} bài viết mẫu!`)

  // Seed thư viện
  const libraries = [
    {
      type: 'IMAGE' as const,
      imageUrl: 'https://placehold.co/800x600?text=Anh+Lop+Hoc',
      videoUrl: null,
      date: new Date('2025-09-10'),
      title: 'Góc học tập Montessori'
    },
    {
      type: 'IMAGE' as const,
      imageUrl: 'https://placehold.co/800x600?text=San+Choi',
      videoUrl: null,
      date: new Date('2025-10-01'),
      title: 'Sân chơi ngoài trời'
    },
    {
      type: 'IMAGE' as const,
      imageUrl: 'https://placehold.co/800x600?text=Le+Hoi',
      videoUrl: null,
      date: new Date('2025-10-15'),
      title: 'Lễ hội Trung Thu 2025'
    },
    {
      type: 'IMAGE' as const,
      imageUrl: 'https://placehold.co/800x600?text=Nau+An',
      videoUrl: null,
      date: new Date('2025-11-05'),
      title: 'Bếp ăn đạt chuẩn vệ sinh'
    },
    {
      type: 'VIDEO' as const,
      imageUrl: null,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      date: new Date('2025-08-20'),
      title: 'Giới thiệu tổng quan trường Mầm Non Hồng Nhung 2025'
    },
    {
      type: 'VIDEO' as const,
      imageUrl: null,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      date: new Date('2025-03-15'),
      title: 'Ngày hội thể thao thiếu nhi tháng 3/2025'
    }
  ]

  await prisma.library.createMany({ data: libraries })
  console.log(`✅ Đã tạo ${libraries.length} mục thư viện (ảnh + video)!`)
}
main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
