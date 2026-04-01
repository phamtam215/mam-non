import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn ảnh' })
  image: string

  @ApiProperty({ example: 'Trường tổ chức lễ hội trung thu 2025' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập nội dung tin tức' })
  text: string
}
