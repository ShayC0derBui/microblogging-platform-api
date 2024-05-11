import { Module } from '@nestjs/common';
import { PostServiceService } from './services/post-service.service';
import { PostControllerController } from './controllers/post-controller.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PostServiceService],
  controllers: [PostControllerController],
})
export class PostsModule { }
