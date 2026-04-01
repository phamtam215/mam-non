import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateCurriculumDto } from './dto/create-curriculum.dto'

@Injectable()
export class CurriculumService {
  constructor(private prisma: PrismaService) {}

  // PUBLIC: Lấy danh sách chương trình học (sắp theo order)
  async findAll() {
    return this.prisma.curriculum.findMany({
      orderBy: { order: 'asc' }
    })
  }

  // ADMIN: Thêm mới chương trình học
  async create(dto: CreateCurriculumDto) {
    return this.prisma.curriculum.create({ data: dto })
  }
}
