import { Module } from '@nestjs/common';
import { PollOptionVotesService } from './service/poll-option-votes.service';
import { PollOptionVotesController } from './controller/poll-option-votes.controller';
import { PrismaModule } from 'src/utilities/prisma/prisma.module';

@Module({
  controllers: [PollOptionVotesController],
  providers: [PollOptionVotesService],
  imports: [PrismaModule]
})
export class PollOptionVotesModule {}
