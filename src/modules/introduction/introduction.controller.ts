import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { IntroductionService } from './introduction.service'
import { CreateIntroductionDto } from './dto/create-introduction.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Giới thiệu')
@Controller('introduction')
export class IntroductionController {
  constructor(private readonly introductionService: IntroductionService) {}

  // PUBLIC: Get giới thiệu
  @Get()
  findAll() {
    return this.introductionService.findAll()
  }

  // PRIVATE: Admin đăng nội dung giới thiệu mới
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createIntroductionDto: CreateIntroductionDto) {
    return this.introductionService.create(createIntroductionDto)
  }
}
