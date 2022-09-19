import { Module } from '@nestjs/common';
import { EventUsersService } from './service/event-users.service';
import { EventUsersController } from './controller/event-users.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [EventUsersController],
  providers: [EventUsersService],
  imports: [PrismaModule, UsersModule]
})
export class EventUsersModule {}
