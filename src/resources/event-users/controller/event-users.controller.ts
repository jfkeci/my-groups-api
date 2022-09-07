import { Controller } from '@nestjs/common';
import { EventUsersService } from '../service/event-users.service';

@Controller('event-users')
export class EventUsersController {
  constructor(private readonly eventUsersService: EventUsersService) {}
}
