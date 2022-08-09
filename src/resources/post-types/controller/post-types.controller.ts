import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { PostTypesService } from '../service/post-types.service';
import { CreatePostTypeDto } from '../dto/create-post-type.dto';

@Controller('post-types')
export class PostTypesController {
  constructor(private readonly postTypesService: PostTypesService) {}

  @HttpCode(201)
  @Post()
  createOne(@Body() data: CreatePostTypeDto) {
    return this.postTypesService.createOne(data);
  }

  @HttpCode(200)
  @Get()
  getPostTypes() {
    return this.postTypesService.getPostTypes();
  }
}
