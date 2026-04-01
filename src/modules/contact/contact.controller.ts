import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Liên hệ')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // PUBLIC: User gửi form liên hệ — không cần Token
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto)
  }

  // PRIVATE: Admin xem danh sách liên hệ
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.contactService.findAll()
  }

  // PRIVATE: Admin đánh dấu đã resolve hay chưa
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id/resolve')
  updateResolved(
    @Param('id') id: string,
    @Body('isResolved') isResolved: boolean
  ) {
    return this.contactService.updateResolved(id, isResolved)
  }
}
