import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode
} from '@nestjs/common';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';
import { CommunityIdParamDto } from '../dto/community-params.dto';
import { CommunitiesService } from '../service/communities.service';
import { CommunityUserDto } from 'src/resources/community-users/dto/community-user.dto';

@Controller('')
export class CommunitiesController {
  constructor(private readonly communityService: CommunitiesService) {}

  @HttpCode(201)
  @Post('check/is-community-admin')
  isUserCommunityAdmin(@Body() data: CommunityUserDto) {
    return this.communityService.isUserCommunityAdmin(data);
  }

  @HttpCode(201)
  @Post('check/is-community-member')
  isUserCommunityMember(@Body() data: CommunityUserDto) {
    return this.communityService.isUserCommunityMember(data);
  }

  @HttpCode(201)
  @Post()
  create(@Body() data: CreateCommunityDto) {
    return this.communityService.createOne(data);
  }

  @HttpCode(200)
  @Get()
  findMany() {
    return this.communityService.findMany({});
  }

  @HttpCode(200)
  @Get(':communityId')
  findUnique(@Param() params: CommunityIdParamDto) {
    return this.communityService.findUnique({ id: Number(params.communityId) });
  }

  @HttpCode(200)
  @Get(':communityId/users')
  getCommunityUsers(@Param() params: CommunityIdParamDto) {
    return this.communityService.getCommunityUsers(Number(params.communityId));
  }

  @HttpCode(200)
  @Patch(':communityId')
  updateOne(
    @Param() params: CommunityIdParamDto,
    @Body() data: UpdateCommunityDto
  ) {
    return this.communityService.updateOne(
      { id: Number(params.communityId) },
      data
    );
  }

  @HttpCode(204)
  @Delete(':communityId')
  deleteOne(@Param() params: CommunityIdParamDto) {
    return this.communityService.deleteOne({ id: Number(params.communityId) });
  }
}
