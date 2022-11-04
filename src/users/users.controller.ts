import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response as eResponse } from 'express';
import { RegisterUser } from './infra/adapter/register-user';
import { UserDTO } from './infra/dto/user-dto';
import { CreateUserService } from './infra/service/create.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: RegisterUser })
  @ApiCreatedResponse({ type: UserDTO })
  async create(
    @Response() response: eResponse,
    @Body() register_user: RegisterUser,
  ) {
    const user = await this.createUserService.run(register_user);
    return response.status(HttpStatus.CREATED).json(user);
  }
}
