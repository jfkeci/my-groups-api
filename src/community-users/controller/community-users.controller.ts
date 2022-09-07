import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { CommunityUserDto } from '../dto/community-user.dto';
import { CommunityUsersService } from '../service/community-users.service';

@Controller('community-users')
export class CommunityUsersController {
  constructor(private readonly communityUsersService: CommunityUsersService) {}

  @HttpCode(200)
  @Post()
  addUserToCommunity(@Body() body: CommunityUserDto) {
    return this.communityUsersService.addUserToCommunity(body);
  }

  @HttpCode(200)
  @Delete()
  removeUserFromCommunity(@Body() body: CommunityUserDto) {
    return this.communityUsersService.removeUserFromCommunity(body);
  }
}
