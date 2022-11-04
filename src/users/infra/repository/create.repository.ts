import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/domain/namespace';
import { User } from 'src/users/domain/user';
import { Repository } from 'typeorm';
import { UserModel } from './user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class CreateUserRepository implements Users.CreateRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async run(user: User): Promise<User> {
    const domain_user = UserMapper.domainToModel(user);
    const orm_user = this.repository.create(domain_user);
    const saved_user = await this.repository.save(orm_user);

    return UserMapper.modelToDomain(saved_user);
  }
}
