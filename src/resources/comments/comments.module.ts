import { Module } from '@nestjs/common';
import { CommentsService } from './service/comments.service';
import { CommentsController } from './controller/comments.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
