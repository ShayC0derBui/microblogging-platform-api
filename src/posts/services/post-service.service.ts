import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma-provider.service';
import { Post, User } from '@prisma/client';

@Injectable()
export class PostServiceService {
  // - Get all posts made by a user
  // - Get all posts existing posts
  // - Get all followers of a user
  // - Get user’s basic details
  // - Update user’s details
  // - Create a post

  constructor(private readonly prisma: PrismaService) {}

  // Get all posts made by a User
  async getPostsByUser(userId: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
  }

  // Get all existing posts
  async getAllPosts(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

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

  // Create a post
  async createPost(userId: string, body: string): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        body,
        userId,
      },
    });
    return post;
  }
}
