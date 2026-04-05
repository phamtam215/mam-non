import {
  Controller, Get, Post, Body, Param, UseGuards,
  UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Throttle } from '@nestjs/throttler'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UploadService } from '../upload/upload.service'

@ApiTags('Tin tức')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly uploadService: UploadService
  ) {}

  // PUBLIC: Get danh sách tin tức
  @ApiOperation({ summary: 'Lấy danh sách tất cả tin tức' })
  @Get()
  findAll() {
    return this.postService.findAll()
  }

  // PUBLIC: Get tin tức theo ID (dùng cho admin khi edit)
  @ApiOperation({ summary: 'Lấy tin tức theo ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId của bài viết' })
  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.postService.findById(id)
  }

  // PUBLIC: Get tin tức theo slug (SEO-friendly URL cho FE)
  @ApiOperation({ summary: 'Lấy tin tức theo slug (SEO)' })
  @ApiParam({ name: 'slug', example: 'truong-to-chuc-le-hoi-trung-thu-2025' })
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postService.findBySlug(slug)
  }

  // PRIVATE: Admin upload ảnh thumbnail cho bài viết
  @ApiOperation({ summary: 'Upload ảnh thumbnail cho bài viết (Admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } } })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { ttl: 60_000, limit: 20 } }) // Tối đa 20 lần upload/phút
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadThumbnail(
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
    const url = await this.uploadService.saveImage(file, 'posts')
    return { url }
  }

  // PRIVATE: Admin đăng tin tức mới
  @ApiOperation({ summary: 'Tạo tin tức mới (Admin)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }
}
