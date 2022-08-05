import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { CommunitiesService } from '../service/communities.service';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';
import { CommunityIdParamDto } from '../dto/community-params.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly connumityService: CommunitiesService) {}

  @Post()
  create(@Body() data: CreateCommunityDto) {
    return this.connumityService.createOne(data);
  }

  @Get()
  findMany() {
    return this.connumityService.findMany({});
  }

  @Get(':communityId')
  findOne(@Param() params: CommunityIdParamDto) {
    return this.connumityService.findUnique({ id: Number(params.communityId) });
  }

  @Patch(':communityId')
  update(
    @Param() params: CommunityIdParamDto,
    @Body() data: UpdateCommunityDto
  ) {
    return this.connumityService.updateOne(
      { id: Number(params.communityId) },
      data
    );
  }

  @Delete(':communityId')
  deleteOne(@Param() params: CommunityIdParamDto) {
    return this.connumityService.deleteOne({ id: Number(params.communityId) });
  }
}
