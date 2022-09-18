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
import { CommentsService } from '../service/comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { PostIdParamDto } from 'src/resources/posts/dto/post-params.dto';
import {
  CommentIdParamDto,
  CommentOwnerDto
} from '../dto/comment-id-param.dto';
import { OptionalCommunityDto } from 'src/resources/communities/dto/community-params.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(200)
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

  @HttpCode(200)
  @Get(':postId')
  getPostComments(@Param() param: PostIdParamDto) {
    return this.commentsService.getPostComments(Number(param.postId));
  }

  @HttpCode(200)
  @Get(':postId/comment/:commentId')
  getPostComment(@Param() params: CommentIdParamDto) {
    return this.commentsService.getPostComment(
      Number(params.postId),
      Number(params.commentId)
    );
  }

  @HttpCode(200)
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

  @HttpCode(200)
  @Delete(':postId/comment/:commentId')
  deletePostComment(
    @Param() params: CommentIdParamDto,
    @Body() body: OptionalCommunityDto
  ) {
    return this.commentsService.deletePostComment(
      Number(params.postId),
      Number(params.commentId),
      Number(body.community)
    );
  }

  @HttpCode(200)
  @Post('/check/is-user-comment-owner')
  isUserCommentOwner(@Body() params: CommentOwnerDto) {
    return this.commentsService.isUserCommentOwner(params);
  }
}
