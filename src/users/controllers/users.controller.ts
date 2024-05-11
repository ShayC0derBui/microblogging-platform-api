import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user-services.service';
import { UserUpdate } from '../user-types';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) { }
  // - Get all followers of a user
  // - Get user’s basic details
  // - Update user’s details

  @Get(':id/followers')
  async getFollowers(@Param('id') id: string): Promise<User[]> {
    return this.userService.getFollowers(id);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUserDetails(id);
  }

  @Post(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UserUpdate,
  ): Promise<User> {
    return this.userService.updateUserDetails(id, data);
  }
}
