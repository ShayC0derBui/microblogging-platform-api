import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma-provider.service';

@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
