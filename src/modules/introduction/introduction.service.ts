import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateIntroductionDto } from './dto/create-introduction.dto'

@Injectable()
export class IntroductionService {
  constructor(private prisma: PrismaService) {}

  // PUBLIC: Lấy toàn bộ nội dung giới thiệu (sắp theo order)
  async findAll() {
    return this.prisma.introduction.findMany({
      orderBy: { order: 'asc' }
    })
  }

  // ADMIN: Thêm mới nội dung giới thiệu
  async create(dto: CreateIntroductionDto) {
    return this.prisma.introduction.create({ data: dto })
  }
}
