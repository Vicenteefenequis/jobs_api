import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Users } from 'src/users/domain/namespace';
import { User } from 'src/users/domain/user';
import { RegisterUser } from '../adapter/register-user';
import { CreateUserRepository } from '../repository/create.repository';
import { plainToClass } from 'class-transformer';
import { UserDTO } from '../dto/user-dto';
import { FindOneRepository } from '../repository/find-one.repository';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(CreateUserRepository)
    private readonly createRepository: Users.CreateRepository,
    @Inject(FindOneRepository)
    private readonly findOneRepository: Users.FindOneRepository,
  ) {}

  async run(register_user: RegisterUser) {
    if (!!(await this.alreadyUserExists(register_user.email))) {
      throw new BadRequestException('user already exists');
    }

    const created_user = new User(register_user);

    created_user.encrypt_password();

    const user = await this.createRepository.run(created_user);
    return plainToClass(UserDTO, user);
  }

  async alreadyUserExists(email: string) {
    return await this.findOneRepository.run({ email });
  }
}
