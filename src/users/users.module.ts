import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserRepository } from './infra/repository/create.repository';
import { FindOneUserRepository } from './infra/repository/find-one.repository';
import { UserModel } from './infra/repository/user.entity';
import { CreateUserService } from './infra/service/create.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [CreateUserRepository, FindOneUserRepository, CreateUserService],
  exports: [FindOneUserRepository],
})
export class UsersModule {}
