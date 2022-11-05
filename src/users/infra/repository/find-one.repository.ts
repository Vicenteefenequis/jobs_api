import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/domain/namespace';
import { User } from 'src/users/domain/user';
import { Repository } from 'typeorm';
import { UserModel } from './user.entity';
import { UserMapper } from './user.mapper';

export class FindOneUserRepository implements Users.FindOneUserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  async run(filter: Partial<Users.Model>): Promise<User> {
    const orm_model = await this.repository.findOneBy(filter);
    return UserMapper.modelToDomain(orm_model);
  }
}
