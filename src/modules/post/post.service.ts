import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { generateSlug, makeUniqueSlug } from './utils/slug.util'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // PUBLIC: Lấy danh sách tin tức (mới nhất lên đầu)
  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }

  // PUBLIC: Lấy tin tức theo slug (SEO)
  async findBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({ where: { slug } })
    if (!post) throw new NotFoundException('Không tìm thấy tin tức')
    return post
  }

  // PUBLIC: Lấy tin tức theo ID
  async findById(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } })
    if (!post) throw new NotFoundException('Không tìm thấy tin tức')
    return post
  }

  // ADMIN: Tạo tin tức mới (tự động sinh slug từ tiêu đề nếu không truyền)
  async create(dto: CreatePostDto) {
    const { slug: rawSlug, ...data } = dto
    const baseSlug = rawSlug ? rawSlug : generateSlug(data.title)
    const uniqueSlug = await this.resolveUniqueSlug(baseSlug)
    return this.prisma.post.create({ data: { ...data, slug: uniqueSlug } })
  }

  // ADMIN: Cập nhật tin tức theo ID
  async update(id: string, dto: UpdatePostDto) {
    await this.findById(id)
    const partial = dto as Partial<CreatePostDto>
    const { slug: rawSlug, title, ...rest } = partial
    let slug: string | undefined
    if (rawSlug !== undefined) {
      slug = await this.resolveUniqueSlug(rawSlug, 0, id)
    } else if (title) {
      slug = await this.resolveUniqueSlug(generateSlug(title), 0, id)
    }
    return this.prisma.post.update({
      where: { id },
      data: { ...rest, ...(title ? { title } : {}), ...(slug ? { slug } : {}) }
    })
  }

  // ADMIN: Xóa tin tức theo ID
  async remove(id: string) {
    await this.findById(id)
    return this.prisma.post.delete({ where: { id } })
  }

  // Tự thêm hậu tố -1, -2,... cho slug sinh tự động nếu trùng
  private async resolveUniqueSlug(base: string, suffix = 0, excludeId?: string): Promise<string> {
    const candidate = makeUniqueSlug(base, suffix)
    const existing = await this.prisma.post.findUnique({
      where: { slug: candidate }
    })
    if (!existing || existing.id === excludeId) return candidate
    return this.resolveUniqueSlug(base, suffix + 1, excludeId)
  }
}
