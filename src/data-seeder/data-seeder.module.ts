import { Module } from '@nestjs/common';
import { SeedController } from './controllers/seed.controller';
import { SeederService } from './services/seeder.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SeedController],
  providers: [SeederService],
})
export class DataSeederModule {}
