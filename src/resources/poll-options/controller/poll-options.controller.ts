import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ToggleVoteDto } from '../dto/toggle-vote.dto';
import { PollOptionsService } from '../service/poll-options.service';

@Controller('poll-options')
export class PollOptionsController {
  constructor(private readonly pollOptionsService: PollOptionsService) {}

  @HttpCode(200)
  @Post('/toggle-poll-option-vote')
  toggleOptionVote(@Body() body: ToggleVoteDto) {
    return this.pollOptionsService.toggleOptionVote(body);
  }
}
