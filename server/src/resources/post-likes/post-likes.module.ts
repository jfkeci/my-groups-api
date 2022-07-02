import { Module } from '@nestjs/common';
import { PostLikesService } from './service/post-likes.service';
import { PostLikesController } from './controller/post-likes.controller';

@Module({
  controllers: [PostLikesController],
  providers: [PostLikesService],
})
export class PostLikesModule {}
