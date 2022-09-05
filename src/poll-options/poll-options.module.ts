import { Module } from '@nestjs/common';
import { PollOptionsService } from './service/poll-options.service';
import { PollOptionsController } from './controller/poll-options.controller';

@Module({
  controllers: [PollOptionsController],
  providers: [PollOptionsService]
})
export class PollOptionsModule {}
