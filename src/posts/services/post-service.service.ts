import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma-provider.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  // - Get all posts made by a user
  // - Get all posts existing posts
  // - Create a post

  constructor(private readonly prisma: PrismaService) { }

  // Get all existing posts

  async getAllPosts(
    cursor: string | undefined,
    pageSize: number = 5,
  ): Promise<{ posts: Post[]; nextCursor: string | null }> {
    const cursorDirection = cursor
      ? { cursor: { id: cursor } }
      : { cursor: undefined };

    const posts = await this.prisma.post.findMany({
      ...cursorDirection,
      take: Number(pageSize) + 1,
      orderBy: { createdAt: 'desc' },
    });

    let nextCursor: string | null = null;

    if (posts.length > pageSize) {
      posts.pop();
      nextCursor = posts[posts.length - 1].id;
    }

    return { posts, nextCursor };
  }

  // Get all posts made by a User
  async getPostsByUser(
    userId: string,
    cursor: string,
    pageSize: number,
  ): Promise<{ posts: Post[]; nextCursor: string | null }> {
    const cursorDirection = cursor
      ? { cursor: { id: cursor } }
      : { cursor: undefined };

    const posts = await this.prisma.post.findMany({
      ...cursorDirection,
      take: Number(pageSize) + 1,
      where: {
        userId,
      },
    });

    let nextCursor: string | null = null;

    if (posts.length > pageSize) {
      posts.pop();
      nextCursor = posts[posts.length - 1].id;
    }
    return { posts, nextCursor };
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
