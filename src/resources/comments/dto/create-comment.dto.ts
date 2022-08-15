import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  createdBy: number;

  @IsNumber()
  @IsNotEmpty()
  post: number;

  @Length(2, 125)
  @IsString()
  @IsNotEmpty()
  text: string;
}
