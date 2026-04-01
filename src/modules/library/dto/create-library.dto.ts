import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { LibraryType } from '@prisma/client'

export class CreateLibraryDto {
  @ApiProperty({ enum: LibraryType, example: LibraryType.IMAGE })
  @IsEnum(LibraryType, { message: 'Loại phải là IMAGE hoặc VIDEO' })
  type: LibraryType

  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn ảnh hoặc link YouTube' })
  mediaUrl: string

  @ApiProperty({ example: 'Các bé vui chơi trong ngày hội thể thao' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập mô tả' })
  text: string
}
