import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập tên phụ huynh' })
  parentName: string

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Vui lòng nhập email' })
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng nhập số điện thoại' })
  phone: string

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng chọn cơ sở' })
  campus: string

  @IsString()
  @IsNotEmpty({ message: 'Vui lòng chọn lớp quan tâm' })
  targetClass: string

  @IsString()
  @IsOptional()
  message?: string
}
