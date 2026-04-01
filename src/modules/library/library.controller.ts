import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { LibraryService } from './library.service'
import { CreateLibraryDto } from './dto/create-library.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { LibraryType } from '@prisma/client'

@ApiTags('Thư viện')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  // PUBLIC: Get thư viện — có thể lọc ?type=IMAGE hoặc ?type=VIDEO
  @ApiQuery({ name: 'type', enum: LibraryType, required: false })
  @Get()
  findAll(@Query('type') type?: LibraryType) {
    return this.libraryService.findAll(type)
  }

  // PRIVATE: Admin thêm ảnh/video vào thư viện
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto)
  }
}
