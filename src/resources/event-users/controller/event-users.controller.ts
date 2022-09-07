import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { AddUserToEventDto } from '../dto/add-user-to-event.dto';
import { RemoveUserFromEventDto } from '../dto/remove-user-from-event.dto';
import { EventUsersService } from '../service/event-users.service';

@Controller('event-users')
export class EventUsersController {
  constructor(private readonly eventUsersService: EventUsersService) {}

  @HttpCode(200)
  @Post()
  addUserToEvent(@Body() body: AddUserToEventDto) {
    return this.eventUsersService.addUserToEvent(body);
  }

  @HttpCode(200)
  @Delete()
  removeEventUser(@Body() body: RemoveUserFromEventDto) {
    return this.eventUsersService.removeEventUser(body);
  }
}
