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
import { CommunitiesService } from '../service/communities.service';
import { CreateCommunityDto } from '../dto/create-community.dto';
import { UpdateCommunityDto } from '../dto/update-community.dto';
import { CommunityIdParamDto } from '../dto/community-params.dto';

@Controller('')
export class CommunitiesController {
  constructor(private readonly connumityService: CommunitiesService) {}

  @HttpCode(201)
  @Post()
  create(@Body() data: CreateCommunityDto) {
    return this.connumityService.createOne(data);
  }

  @HttpCode(200)
  @Get()
  findMany() {
    return this.connumityService.findMany({});
  }

  @HttpCode(200)
  @Get(':communityId')
  findOne(@Param() params: CommunityIdParamDto) {
    return this.connumityService.findUnique({ id: Number(params.communityId) });
  }

  @HttpCode(200)
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

  @HttpCode(204)
  @Delete(':communityId')
  deleteOne(@Param() params: CommunityIdParamDto) {
    return this.connumityService.deleteOne({ id: Number(params.communityId) });
  }
}
