import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateIntroductionDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn ảnh' })
  image: string

  @ApiProperty({ example: 'Trường mầm non Hoa Sen được thành lập năm 2010...' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập nội dung giới thiệu' })
  text: string
}
