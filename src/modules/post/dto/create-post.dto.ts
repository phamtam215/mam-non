import { IsNotEmpty, IsOptional, IsString, IsDateString, Matches } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreatePostDto {
  @ApiPropertyOptional({
    example: 'truong-to-chuc-le-hoi-trung-thu-2025',
    description: 'Slug SEO-friendly. Nếu bỏ trống sẽ tự động tạo từ tiêu đề.'
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang' })
  slug?: string

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
