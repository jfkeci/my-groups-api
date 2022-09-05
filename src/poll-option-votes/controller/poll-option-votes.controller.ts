import { Controller } from '@nestjs/common';
import { PollOptionVotesService } from '../service/poll-option-votes.service';

@Controller('poll-option-votes')
export class PollOptionVotesController {
  constructor(
    private readonly pollOptionVotesService: PollOptionVotesService
  ) {}
}
