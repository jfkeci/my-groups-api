import { Controller, Body, HttpCode, Post } from '@nestjs/common';
import { PostLikeDto } from '../dto/post-like.dto';
import { PostLikesService } from '../service/post-likes.service';

@Controller('post-likes')
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @HttpCode(200)
  @Post('/toggle-post-like')
  togglePostLike(@Body() body: PostLikeDto) {
    return this.postLikesService.togglePostLike(body);
  }
}
