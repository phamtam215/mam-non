import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { CurriculumService } from './curriculum.service'
import { CreateCurriculumDto } from './dto/create-curriculum.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Chương trình học')
@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  // PUBLIC: Get chương trình học
  @Get()
  findAll() {
    return this.curriculumService.findAll()
  }

  // PRIVATE: Admin thêm chương trình học mới
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCurriculumDto: CreateCurriculumDto) {
    return this.curriculumService.create(createCurriculumDto)
  }
}
