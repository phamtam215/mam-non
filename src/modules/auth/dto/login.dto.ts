import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsString({ message: 'Tài khoản phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tài khoản không được để trống' })
  username: string

  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string
}
