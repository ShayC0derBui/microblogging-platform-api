import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user-services.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule { }
