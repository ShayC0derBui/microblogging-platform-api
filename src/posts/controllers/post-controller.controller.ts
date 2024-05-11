import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from '../services/post-service.service';
import { Post as PostModel } from '@prisma/client';

@Controller('posts')
export class PostController {
  // - Get all posts made by a user
  // - Get all posts existing posts
  // - Create a post

  constructor(private readonly postService: PostService) { }

  // Get all posts made by a user
  @Get(':userId')
  async getPostsByUser(
    @Param('userId') userId: string,
    @Query('cursor') cursor: string,
    @Query('pageSize') pageSize: number,
  ): Promise<{ posts: PostModel[]; nextCursor: string | null }> {
    return this.postService.getPostsByUser(userId, cursor, pageSize);
  }

  // Get all existing posts
  @Get()
  async getAllPosts(
    @Query('cursor') cursor: string,
    @Query('pageSize') pageSize: number,
  ): Promise<{
    posts: PostModel[];
    nextCursor: string | null;
  }> {
    return this.postService.getAllPosts(cursor, pageSize);
  }

  // Create a post
  @Post(':userId')
  async createPost(
    @Param('userId') userId: string,
    @Body('body') body: string,
  ): Promise<PostModel> {
    return this.postService.createPost(userId, body);
  }
}
