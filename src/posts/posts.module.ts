import { Module } from '@nestjs/common';
import { PostServiceService } from './services/post-service.service';
import { PostControllerController } from './controllers/post-controller.controller';

@Module({
  providers: [PostServiceService],
  controllers: [PostControllerController]
})
export class PostsModule {}
