import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserIdParamDto } from '../dto/user-id-param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId')
  getUser(@Param() param: UserIdParamDto) {
    return this.usersService.findOne(param.userId);
  }
}
