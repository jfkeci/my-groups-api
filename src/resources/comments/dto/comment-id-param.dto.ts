import { IsNotEmpty, IsString } from 'class-validator';

export class CommentIdParamDto {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  commentId: string;
}
