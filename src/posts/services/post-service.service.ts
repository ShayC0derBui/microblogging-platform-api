import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma-provider.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  // - Get all posts made by a user
  // - Get all posts existing posts
  // - Get all followers of a user
  // - Get user’s basic details
  // - Update user’s details
  // - Create a post

  constructor(private readonly prisma: PrismaService) { }

  // Get all existing posts
  async getAllPosts(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  // Get all posts made by a User
  async getPostsByUser(userId: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
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
