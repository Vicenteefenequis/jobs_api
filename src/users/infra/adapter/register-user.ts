import { Users } from 'src/users/domain/namespace';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUser {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @ApiProperty({ example: '+5562982622350' })
  @IsNotEmpty({ message: 'Phone should not be empty' })
  phone: string;

  @ApiProperty({ example: 'johndoe@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'johndoe123' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @ApiProperty({
    example: {
      country: 'Brazil',
      state: 'Goiás',
      city: 'Goiânia',
      neighborhood: 'Bairro ....',
      zip: '00000000',
    },
  })
  address: Users.Address;
}
