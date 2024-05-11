import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserServicesService } from './services/user-services.service';

@Module({
  controllers: [UsersController],
  providers: [UserServicesService]
})
export class UsersModule {}
