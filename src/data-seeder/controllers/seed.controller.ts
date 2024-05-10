import { Controller, Post } from '@nestjs/common';
import { SeederService } from '../services/seeder.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seederService: SeederService) {}

  @Post('seed')
  async seedData() {
    await this.seederService.seedUsers(10);
    await this.seederService.followUsers();
    return 'Data seeding completed'; // Return a response to indicate success
  }
}
