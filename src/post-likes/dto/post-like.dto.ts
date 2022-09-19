import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostLikeDto {
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  post: number;
}
