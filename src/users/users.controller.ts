import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response as eResponse } from 'express';
import { RegisterUser } from './infra/adapter/register-user';
import { CreateUserService } from './infra/service/create.service';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Response() response: eResponse,
    @Body() register_user: RegisterUser,
  ) {
    const user = await this.createUserService.run(register_user);
    return response.status(HttpStatus.CREATED).json(user);
  }
}
