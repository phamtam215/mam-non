import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateLibraryDto } from './dto/create-library.dto'
import { UpdateLibraryDto } from './dto/update-library.dto'
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

  // ADMIN: Cập nhật mục thư viện theo ID
  async update(id: string, dto: UpdateLibraryDto) {
    const existing = await this.prisma.library.findUnique({ where: { id } })
    if (!existing) throw new NotFoundException('Không tìm thấy mục thư viện')
    return this.prisma.library.update({ where: { id }, data: dto })
  }

  // ADMIN: Xóa mục thư viện theo ID
  async remove(id: string) {
    const existing = await this.prisma.library.findUnique({ where: { id } })
    if (!existing) throw new NotFoundException('Không tìm thấy mục thư viện')
    return this.prisma.library.delete({ where: { id } })
  }
}
