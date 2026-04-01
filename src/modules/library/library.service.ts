import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateLibraryDto } from './dto/create-library.dto'
import { LibraryType } from '@prisma/client'

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService) {}

  // PUBLIC: Lấy danh sách thư viện, có thể lọc theo loại (IMAGE hoặc VIDEO)
  async findAll(type?: LibraryType) {
    return this.prisma.library.findMany({
      where: type ? { type } : {},
      orderBy: { createdAt: 'desc' }
    })
  }

  // ADMIN: Thêm mới vào thư viện
  async create(dto: CreateLibraryDto) {
    return this.prisma.library.create({ data: dto })
  }
}
