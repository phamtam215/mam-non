import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Tin tức')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // PUBLIC: Get danh sách tin tức
  @Get()
  findAll() {
    return this.postService.findAll()
  }

  // PRIVATE: Admin đăng tin tức mới
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto)
  }
}
