import { Module } from '@nestjs/common';
import { PollOptionsService } from './service/poll-options.service';
import { PollOptionsController } from './controller/poll-options.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [PollOptionsController],
  providers: [PollOptionsService],
  imports: [PrismaModule, UsersModule]
})
export class PollOptionsModule {}
