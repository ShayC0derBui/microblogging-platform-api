import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DataSeederModule } from './data-seeder/data-seeder.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, PostsModule, DataSeederModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
