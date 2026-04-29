import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  // Phụ huynh gửi form
  async create(createContactDto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        ...createContactDto,
        message: createContactDto.message ?? ''
      }
    })
  }

  // Admin xem toàn bộ danh sách
  async findAll() {
    return this.prisma.contact.findMany({
      orderBy: { createdAt: 'desc' } // Mới nhất hiện lên đầu
    })
  }

  // Admin đánh dấu trạng thái đã xử lý hay chưa
  async updateResolved(id: string, isResolved: boolean) {
    return this.prisma.contact.update({
      where: { id },
      data: { isResolved }
    })
  }
}
