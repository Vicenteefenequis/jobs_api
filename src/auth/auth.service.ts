import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { UserDTO } from 'src/users/infra/dto/user-dto';
import { FindOneUserRepository } from 'src/users/infra/repository/find-one.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(FindOneUserRepository)
    private readonly findOneUserRepository: FindOneUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDTO> {
    const user = await this.findOneUserRepository.run({ email });
    if (!user.has_valid_password(password)) return null;
    return plainToClass(UserDTO, user);
  }

  login(user: UserDTO) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES'),
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      }),
    };
  }
}
