import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentIdParamDto {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  commentId: string;
}

export class CommentOwnerDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number;
}
