import { Module } from '@nestjs/common';
import { PollOptionVotesService } from './service/poll-option-votes.service';
import { PollOptionVotesController } from './controller/poll-option-votes.controller';

@Module({
  controllers: [PollOptionVotesController],
  providers: [PollOptionVotesService]
})
export class PollOptionVotesModule {}
