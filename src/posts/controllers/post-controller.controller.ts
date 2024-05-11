import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  async getPostsByUser(@Param('userId') userId: string): Promise<PostModel[]> {
    return this.postService.getPostsByUser(userId);
  }

  // Get all existing posts
  @Get()
  async getAllPosts(): Promise<PostModel[]> {
    return this.postService.getAllPosts();
  }

  // Create a post
  @Post()
  async createPost(
    @Body('userId') userId: string,
    @Body('body') body: string,
  ): Promise<PostModel> {
    return this.postService.createPost(userId, body);
  }
}
