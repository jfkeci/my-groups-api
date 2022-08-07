import { Body, Controller, Post } from '@nestjs/common';
import { PostTypesService } from '../service/post-types.service';
import { CreatePostTypeDto } from '../dto/create-post-type.dto';

@Controller('post-types')
export class PostTypesController {
  constructor(private readonly postTypesService: PostTypesService) {}

  @Post()
  createPostType(@Body() data: CreatePostTypeDto) {
    return this.postTypesService.createOne(data);
  }
}
