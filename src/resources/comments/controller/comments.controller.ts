import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { PostIdParamDto } from 'src/resources/posts/dto/post-params.dto';
import { CommentIdParamDto } from '../dto/comment-id-param.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':postId')
  create(
    @Param() param: PostIdParamDto,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentsService.createPostComment(
      Number(param.postId),
      createCommentDto
    );
  }

  @Get(':postId')
  getPostComments(@Param() param: PostIdParamDto) {
    return this.commentsService.getPostComments(Number(param.postId));
  }

  @Get(':postId/comment/:commentId')
  getPostComment(@Param() params: CommentIdParamDto) {
    return this.commentsService.getPostComment(
      Number(params.postId),
      Number(params.commentId)
    );
  }

  @Patch(':postId/comment/:commentId')
  updatePostComment(
    @Param() params: CommentIdParamDto,
    @Body() body: UpdateCommentDto
  ) {
    return this.commentsService.updatePostComment(
      Number(params.postId),
      Number(params.commentId),
      body
    );
  }

  @Delete(':postId/comment/:commentId')
  deletePostComment(@Param() params: CommentIdParamDto) {
    return this.commentsService.deletePostComment(
      Number(params.postId),
      Number(params.commentId)
    );
  }
}
