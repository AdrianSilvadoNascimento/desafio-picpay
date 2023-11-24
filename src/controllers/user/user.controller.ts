import { Body, Controller, Get, Post } from '@nestjs/common'

import { UserDto } from '../../dtos/user-dto';
import { UserModel } from '../../entities/user-model.ts';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register-user')
  async registerUser(@Body() body: UserDto): Promise<UserModel> {
    return await this.userService.registerUser(body)
  }

  @Get('get-users')
  async getUsers(): Promise<UserModel[]> {
    return await this.userService.getUsers()
  }
}
