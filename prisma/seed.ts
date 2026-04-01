import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Xóa dữ liệu cũ để tránh conflict với index của schema cũ
  await prisma.post.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.introduction.deleteMany()
  await prisma.curriculum.deleteMany()
  await prisma.library.deleteMany()

  // Drop index cũ của field slug (nếu còn tồn tại từ schema cũ)
  try {
    await prisma.$runCommandRaw({ dropIndexes: 'Post', index: 'Post_slug_key' })
  } catch {
    // Không sao nếu index không tồn tại
  }

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
      image: 'https://placehold.co/800x500?text=Khai+Giang',
      text: 'Khai giảng năm học mới 2025-2026 tại Mầm Non Hồng Nhung. Buổi lễ diễn ra trong không khí ấm áp với nhiều hoạt động ý nghĩa.'
    },
    {
      image: 'https://placehold.co/800x500?text=Be+Kheo+Tay',
      text: 'Hội thi Bé Khéo Tay tháng 10 với chủ đề Mùa Thu Vàng. Các bé tạo ra những tác phẩm nghệ thuật tuyệt vời.'
    },
    {
      image: 'https://placehold.co/800x500?text=Da+Ngoai',
      text: 'Chuyến dã ngoại tham quan vườn thú Thủ Lệ giúp các bé khám phá thế giới động vật phong phú.'
    }
  ]

  for (const post of posts) {
    await prisma.post.create({ data: post })
  }

  console.log(`✅ Đã tạo ${posts.length} bài viết mẫu!`)

  // Seed giới thiệu
  const introductions = [
    {
      order: 1,
      image: 'https://placehold.co/800x500?text=Gioi+Thieu+1',
      text: 'Trường Mầm Non Hồng Nhung được thành lập năm 2010, là ngôi nhà thứ hai của hàng nghìn trẻ em tại TP.HCM. Chúng tôi cam kết mang đến môi trường học tập an toàn, vui vẻ và đầy yêu thương.'
    },
    {
      order: 2,
      image: 'https://placehold.co/800x500?text=Gioi+Thieu+2',
      text: 'Với đội ngũ giáo viên được đào tạo bài bản và tận tâm, chúng tôi áp dụng phương pháp giáo dục hiện đại kết hợp triết lý Montessori, giúp mỗi bé phát triển toàn diện về thể chất lẫn tinh thần.'
    },
    {
      order: 3,
      image: 'https://placehold.co/800x500?text=Gioi+Thieu+3',
      text: 'Cơ sở vật chất khang trang, sạch sẽ với khuôn viên rộng rãi, đầy đủ trang thiết bị hiện đại. Không gian vui chơi ngoài trời xanh mát giúp các bé phát triển thể chất và tư duy sáng tạo.'
    }
  ]

  await prisma.introduction.createMany({ data: introductions })
  console.log(`✅ Đã tạo ${introductions.length} nội dung giới thiệu!`)

  // Seed chương trình học
  const curriculums = [
    {
      order: 1,
      image: 'https://placehold.co/800x500?text=Montessori',
      text: 'Phương pháp Montessori: Khơi dậy tiềm năng tự nhiên của trẻ thông qua việc học bằng thực hành. Trẻ được tự do lựa chọn hoạt động trong môi trường được chuẩn bị sẵn, phát triển tính độc lập và tập trung.'
    },
    {
      order: 2,
      image: 'https://placehold.co/800x500?text=STEM',
      text: 'Chương trình STEM mầm non: Giúp trẻ làm quen với Khoa học, Công nghệ, Kỹ thuật và Toán học qua các thí nghiệm vui nhộn, đơn giản phù hợp lứa tuổi, kích thích tư duy logic và sáng tạo.'
    },
    {
      order: 3,
      image: 'https://placehold.co/800x500?text=Ngon+Ngu',
      text: 'Phát triển ngôn ngữ: Chương trình đọc sách, kể chuyện và học tiếng Anh từ sớm giúp trẻ xây dựng vốn từ vựng phong phú, tự tin giao tiếp và yêu thích văn học từ bé.'
    },
    {
      order: 4,
      image: 'https://placehold.co/800x500?text=Am+Nhac+Va+Nghe+Thuat',
      text: 'Âm nhạc & Nghệ thuật: Các lớp học vẽ, tô màu, múa hát và nhạc cụ giúp trẻ bộc lộ cảm xúc, phát triển thẩm mỹ và khả năng sáng tạo nghệ thuật từ những năm đầu đời.'
    },
    {
      order: 5,
      image: 'https://placehold.co/800x500?text=The+Chat',
      text: 'Giáo dục thể chất: Các hoạt động vận động ngoài trời, yoga thiếu nhi và thể dục nhịp điệu giúp trẻ phát triển thể lực, rèn luyện sự dẻo dai và tinh thần đồng đội.'
    }
  ]

  await prisma.curriculum.createMany({ data: curriculums })
  console.log(`✅ Đã tạo ${curriculums.length} chương trình học!`)

  // Seed thư viện
  const libraries = [
    {
      type: 'IMAGE' as const,
      mediaUrl: 'https://placehold.co/800x600?text=Anh+Lop+Hoc',
      text: 'Góc học tập Montessori với đồ dùng học liệu sinh động, màu sắc'
    },
    {
      type: 'IMAGE' as const,
      mediaUrl: 'https://placehold.co/800x600?text=San+Choi',
      text: 'Sân chơi ngoài trời rộng rãi, an toàn cho các bé vận động'
    },
    {
      type: 'IMAGE' as const,
      mediaUrl: 'https://placehold.co/800x600?text=Le+Hoi',
      text: 'Lễ hội Trung Thu 2025 — các bé rước đèn và phá cỗ vui tươi'
    },
    {
      type: 'IMAGE' as const,
      mediaUrl: 'https://placehold.co/800x600?text=Nau+An',
      text: 'Bếp ăn đạt chuẩn vệ sinh, thực đơn dinh dưỡng được chuyên gia tư vấn'
    },
    {
      type: 'VIDEO' as const,
      mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      text: 'Video giới thiệu tổng quan trường Mầm Non Hồng Nhung 2025'
    },
    {
      type: 'VIDEO' as const,
      mediaUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      text: 'Hoạt động ngoại khóa — Ngày hội thể thao thiếu nhi tháng 3/2025'
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
