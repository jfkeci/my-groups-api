import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Query
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserIdParamDto } from '../dto/user-id-param.dto';
import { UserCommunityParamsDto } from 'src/resources/communities/dto/user-community-params.dto';
import { CraetedByQueryParamDto } from '../dto/created-by-query.param.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId')
  getUser(
    @Param() param: UserIdParamDto,
    @Query('currentUser') currentUser: string
  ) {
    return this.usersService.findOne(Number(param.userId), Number(currentUser));
  }

  @Delete('/:userId')
  deleteUser(@Param() param: UserIdParamDto) {
    return this.usersService.deleteUser(Number(param.userId));
  }

  @Get('/:userId/communities')
  getUserCommunities(@Param() param: UserIdParamDto) {
    return this.usersService.getUserCommunities(Number(param.userId));
  }
  //aaa
  @Get('/:userId/posts')
  getUserPostsForAllCommunities(
    @Param() param: UserIdParamDto,
    @Query() query: CraetedByQueryParamDto
  ) {
    return this.usersService.getUserPostsForAllCommunities(
      Number(param.userId),
      query?.createdBy
    );
  }

  @Get('/:userId/posts/:communityId')
  getUserCommunityPosts(
    @Param() param: UserCommunityParamsDto,
    @Query() query: CraetedByQueryParamDto
  ) {
    return this.usersService.getUserCommunityPosts(
      Number(param.userId),
      Number(param.communityId),
      query?.createdBy
    );
  }
}
