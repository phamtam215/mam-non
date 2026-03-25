import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards
} from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // PUBLIC: Phụ huynh gửi form không cần Token
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    console.log('hello')
    return this.contactService.create(createContactDto)
  }

  // PRIVATE: Chỉ Admin có Token mới lấy được danh sách
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.contactService.findAll()
  }

  // PRIVATE: Admin cập nhật trạng thái xử lý
  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  update(@Param('id') id: string, @Body('status') status: string) {
    return this.contactService.updateStatus(id, status)
  }
}
