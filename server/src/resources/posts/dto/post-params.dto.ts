import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}

export class PostUserParamDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
