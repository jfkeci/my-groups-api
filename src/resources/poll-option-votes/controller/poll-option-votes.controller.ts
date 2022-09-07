import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { AddVoteToOptionDto } from '../dto/add-vote-to-option.dto';
import { RemoveVoteFromOptionDto } from '../dto/remove-vote-from-option.dto';
import { PollOptionVotesService } from '../service/poll-option-votes.service';

@Controller('poll-option-votes')
export class PollOptionVotesController {
  constructor(
    private readonly pollOptionVotesService: PollOptionVotesService
  ) {}

  @HttpCode(200)
  @Post()
  addVoteToOption(@Body() body: AddVoteToOptionDto) {
    return this.pollOptionVotesService.addVoteToOption(body);
  }

  @HttpCode(200)
  @Delete()
  removeVoteFromOption(@Body() body: RemoveVoteFromOptionDto) {
    return this.pollOptionVotesService.removeVoteFromOption(body);
  }
}
