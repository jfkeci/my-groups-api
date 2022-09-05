import { Controller } from '@nestjs/common';
import { PollOptionsService } from '../service/poll-options.service';

@Controller('poll-options')
export class PollOptionsController {
  constructor(private readonly pollOptionsService: PollOptionsService) {}
}
