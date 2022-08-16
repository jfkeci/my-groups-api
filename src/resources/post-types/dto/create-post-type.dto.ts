import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class CreatePostTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 45)
  id: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 45)
  title: string;

  @IsString()
  @IsOptional()
  @Length(2, 125)
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;

  @IsNotEmpty()
  structure: any;
}
