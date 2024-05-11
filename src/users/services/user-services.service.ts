import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserUpdate } from '../user-types';
import { PrismaService } from 'src/prisma/services/prisma-provider.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  // Get users
  async getAllUsers(
    cursor: string | undefined,
    pageSize: number = 5,
  ): Promise<{ users: User[]; nextCursor: string | null }> {
    const cursorDirection = cursor
      ? { cursor: { id: cursor } }
      : { cursor: undefined };

    const users = await this.prisma.user.findMany({
      ...cursorDirection,
      take: pageSize + 1,
    });

    let nextCursor: string | null = null;

    if (users.length > pageSize) {
      users.pop();
      nextCursor = users[users.length - 1].id;
    }

    return { users, nextCursor };
  }

  // Get all followers of a User
  async getFollowers(
    userId: string,
    cursor: string,
    pageSize: number = 5,
  ): Promise<{ users: User[]; nextCursor: string | null }> {
    const cursorDirection = cursor
      ? { cursor: { id: cursor } }
      : { cursor: undefined };

    const Ids = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followingIds: true,
      },
    });

    const followers = await this.prisma.user.findMany({
      ...cursorDirection,
      take: pageSize + 1,
      where: {
        id: {
          in: Ids.followingIds,
        },
      },
    });

    let nextCursor: string | null = null;

    if (followers.length > pageSize) {
      followers.pop();
      nextCursor = followers[followers.length - 1].id;
    }

    return { users: followers, nextCursor };
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
  async updateUserDetails(userId: string, data: UserUpdate): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
    return user;
  }
}
