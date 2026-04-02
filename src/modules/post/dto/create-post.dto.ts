import { IsNotEmpty, IsString, IsDateString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn ảnh đại diện' })
  thumbnail: string

  @ApiProperty({ example: '2026-04-02T00:00:00.000Z' })
  @IsDateString({}, { message: 'Ngày không hợp lệ' })
  @IsNotEmpty({ message: 'Vui lòng nhập ngày đăng' })
  date: string

  @ApiProperty({ example: 'Sự kiện' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập loại tin tức' })
  category: string

  @ApiProperty({ example: 'Trường tổ chức lễ hội trung thu 2025' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập tiêu đề' })
  title: string

  @ApiProperty({ example: 'Nội dung chi tiết của bài viết...' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập tin chi tiết' })
  content: string
}
