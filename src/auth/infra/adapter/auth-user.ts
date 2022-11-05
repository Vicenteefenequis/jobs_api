import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthUser {
  @ApiProperty({ example: 'johndoe@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'johndoe123' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
