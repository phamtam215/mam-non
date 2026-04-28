import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, ValidateIf } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { LibraryType } from '@prisma/client'

export class CreateLibraryDto {
  @ApiProperty({ enum: LibraryType, example: LibraryType.IMAGE })
  @IsEnum(LibraryType, { message: 'Loại phải là IMAGE hoặc VIDEO' })
  type: LibraryType

  @ApiPropertyOptional({ example: 'https://example.com/photo.jpg' })
  @ValidateIf(o => o.type === LibraryType.IMAGE)
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn ảnh' })
  imageUrl?: string

  @ApiPropertyOptional({ example: 'https://www.youtube.com/watch?v=abc123' })
  @ValidateIf(o => o.type === LibraryType.VIDEO)
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn video' })
  videoUrl?: string

  @ApiPropertyOptional({ example: 'https://example.com/thumbnail.jpg' })
  @IsOptional()
  @IsString()
  thumbnailUrl?: string

  @ApiProperty({ example: '2026-04-02T00:00:00.000Z' })
  @IsDateString({}, { message: 'Ngày không hợp lệ' })
  @IsNotEmpty({ message: 'Vui lòng nhập ngày' })
  date: string

  @ApiProperty({ example: 'Các bé vui chơi trong ngày hội thể thao' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập tiêu đề' })
  title: string
}
