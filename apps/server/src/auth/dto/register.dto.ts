import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class RegisterDto {
	@ApiProperty({
		description: 'Username',
		example: 'johndoe',
	})
	@IsString()
	@IsNotEmpty()
	userName: string

	@ApiProperty({
		description: 'Email',
		example: 'johndoe@gmail.com',
	})
	@IsEmail()
	@IsNotEmpty()
	email: string

	@ApiProperty({
		description: 'Password',
		example: '123456',
	})
	@IsString()
	@IsNotEmpty()
	password: string

}
