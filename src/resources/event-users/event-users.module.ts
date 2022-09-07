import { Module } from '@nestjs/common';
import { EventUsersService } from './service/event-users.service';
import { EventUsersController } from './controller/event-users.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';

@Module({
  controllers: [EventUsersController],
  providers: [EventUsersService],
  imports: [PrismaModule]
})
export class EventUsersModule {}
