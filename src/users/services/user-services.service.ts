import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) { }

  // Get all followers of a User
  async getFollowers(userId: string): Promise<User[]> {
    const Ids = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followingIds: true,
      },
    });
    const followers = await this.prisma.user.findMany({
      where: {
        id: {
          in: Ids.followingIds,
        },
      },
    });
    return followers;
  }

  // Get user's basic details
  async getUserDetails(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  // Update user's details
  async updateUserDetails(userId: string, data: User): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return user;
  }
}
