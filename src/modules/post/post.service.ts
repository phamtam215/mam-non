import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // PUBLIC: Lấy danh sách tin tức (mới nhất lên đầu)
  async findAll() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    })
  }

  // ADMIN: Tạo tin tức mới
  async create(dto: CreatePostDto) {
    return this.prisma.post.create({ data: dto })
  }
}
