import { Controller, Post } from '@nestjs/common';
import { SeederService } from '../services/seeder.service';

@Controller('seeder')
export class SeedController {
  constructor(private readonly seederService: SeederService) { }

  @Post('seedUsers')
  async seedData() {
    await this.seederService.seedUsers(10);
    await this.seederService.followUsers();
    return 'Data seeding completed'; // Return a response to indicate success
  }

  @Post('seedPosts')
  async seedPosts() {
    await this.seederService.seedPosts(10);
    return 'Posts seeding completed'; // Return a response to indicate success
  }
}
