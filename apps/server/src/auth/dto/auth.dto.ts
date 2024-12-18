import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @ApiProperty({
    description: 'Email',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Password',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
