import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCurriculumDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập đường dẫn ảnh' })
  image: string

  @ApiProperty({ example: 'Chương trình Montessori cho trẻ 3-4 tuổi' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập mô tả chương trình học' })
  text: string
}
