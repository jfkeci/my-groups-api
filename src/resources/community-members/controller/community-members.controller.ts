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
import { CommunityIdParamDto } from 'src/resources/communities/dto/community-params.dto';
import { CommunityMemberParamsDto } from '../dto/community-member-params.dto';
import { CommunityMembersService } from '../service/community-members.service';

@Controller('')
export class CommunityMembersController {
  constructor(
    private readonly communityMembersService: CommunityMembersService
  ) {}

  @HttpCode(200)
  @Get()
  getCommunityMembers(@Param() param: CommunityIdParamDto) {
    return this.communityMembersService.getCommunityMembers(
      Number(param.communityId)
    );
  }

  @HttpCode(201)
  @Post('/:userId')
  addMemberToCommunity(@Param() param: CommunityMemberParamsDto) {
    return this.communityMembersService.addMemberToCommunity(
      Number(param.userId),
      Number(param.communityId)
    );
  }

  @HttpCode(204)
  @Delete('/:userId')
  removeMemberFromCommunity(@Param() param: CommunityMemberParamsDto) {
    return this.communityMembersService.removeMemberFromCommunity(
      Number(param.userId),
      Number(param.communityId)
    );
  }
}
