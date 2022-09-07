import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostIdParamDto {
  @IsString()
  @IsNotEmpty()
  postId: string;
}

export class PostUserParamDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
