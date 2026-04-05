import {
  Controller, Get, Post, Body, Query, UseGuards,
  UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiBearerAuth, ApiQuery, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger'
import { LibraryService } from './library.service'
import { CreateLibraryDto } from './dto/create-library.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { LibraryType } from '@prisma/client'
import { UploadService } from '../upload/upload.service'

@ApiTags('Thư viện')
@Controller('library')
export class LibraryController {
  constructor(
    private readonly libraryService: LibraryService,
    private readonly uploadService: UploadService
  ) {}

  // PUBLIC: Get thư viện — có thể lọc ?type=IMAGE hoặc ?type=VIDEO
  @ApiQuery({ name: 'type', enum: LibraryType, required: false })
  @Get()
  findAll(@Query('type') type?: LibraryType) {
    return this.libraryService.findAll(type)
  }

  // PRIVATE: Admin upload ảnh vào thư viện
  @ApiOperation({ summary: 'Upload ảnh vào thư viện (Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024, message: 'Ảnh tối đa 2MB' }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ })
        ]
      })
    )
    file: Express.Multer.File
  ) {
    const url = await this.uploadService.saveImage(file, 'library')
    return { url }
  }

  // PRIVATE: Admin thêm ảnh/video vào thư viện
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.libraryService.create(createLibraryDto)
  }
}
