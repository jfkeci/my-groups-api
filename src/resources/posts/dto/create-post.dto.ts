import {
  IsNotEmpty,
  IsNumber,
  IsObject,
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
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;

  @IsNumber()
  @IsNotEmpty()
  community: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsObject()
  @IsNotEmpty()
  structure: any;
}
