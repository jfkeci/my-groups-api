import { Module } from '@nestjs/common';
import { EventUsersService } from './service/event-users.service';
import { EventUsersController } from './controller/event-users.controller';

@Module({
  controllers: [EventUsersController],
  providers: [EventUsersService]
})
export class EventUsersModule {}
