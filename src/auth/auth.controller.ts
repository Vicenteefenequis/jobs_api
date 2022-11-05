import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request as eRequest } from 'express';
import { UserDTO } from 'src/users/infra/dto/user-dto';
import { AuthService } from './auth.service';
import { AuthUser } from './infra/adapter/auth-user';
import { JwtAuthGuard } from './infra/guards/jwt-auth-guard';
import { LocalAuthGuard } from './infra/guards/local-auth-guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: AuthUser })
  login(@Request() request: eRequest) {
    return this.authService.login(request.user as UserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request: eRequest) {
    return request.user;
  }
}
