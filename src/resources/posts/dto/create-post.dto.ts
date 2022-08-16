import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 125)
  title: string;

  @IsString()
  @IsOptional()
  @Length(2, 255)
  body?: string;

  @IsString()
  @IsOptional()
  @Length(2, 125)
  iamge?: string;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;

  @IsNumber()
  @IsNotEmpty()
  community: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
