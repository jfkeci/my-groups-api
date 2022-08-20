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
import { PostsService } from '../service/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostIdParamDto } from '../dto/post-params.dto';

@Controller('')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get(':postId')
  findOne(@Param() params: PostIdParamDto) {
    return this.postService.findUnique({ id: Number(params.postId) });
  }

  @Post()
  @HttpCode(201)
  create(@Body() data: CreatePostDto) {
    return this.postService.createOne(data);
  }

  @Get()
  findMany() {
    return this.postService.findMany({});
  }

  @Patch(':postId')
  update(@Param() params: PostIdParamDto, @Body() data: UpdatePostDto) {
    return this.postService.updateOne({ id: Number(params.postId) }, data);
  }

  @Delete(':postId')
  deleteOne(@Param() params: PostIdParamDto) {
    return this.postService.deleteOne({ id: Number(params.postId) });
  }
}
