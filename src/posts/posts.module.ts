import { Module } from '@nestjs/common';
import { PostService } from './services/post-service.service';
import { PostController } from './controllers/post-controller.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostsModule { }
