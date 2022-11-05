import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindOneUserRepository } from 'src/users/infra/repository/find-one.repository';
import { UserModel } from 'src/users/infra/repository/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { LocalStrategy } from './infra/strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController],
  providers: [
    AuthService,
    FindOneUserRepository,
    JwtService,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
