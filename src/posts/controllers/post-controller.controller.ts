import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostServiceService } from '../services/post-service.service';

@Controller('posts')
export class PostControllerController {
  // - Get all posts made by a user
  // - Get all posts existing posts
  // - Get all followers of a user
  // - Get user’s basic details
  // - Update user’s details
  // - Create a post

  constructor(private readonly postService: PostServiceService) { }

  // Get all posts made by a user
  @Get(':userId')
  async getPostsByUser(@Param('userId') userId: string) {
    return this.postService.getPostsByUser(userId);
  }

  // Get all existing posts
  @Get('posts')
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  // Create a post
  @Post()
  async createPost(@Body('userId') userId: string, @Body('body') body: string) {
    return this.postService.createPost(userId, body);
  }
}
