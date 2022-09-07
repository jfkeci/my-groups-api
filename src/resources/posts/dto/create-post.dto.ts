import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested
} from 'class-validator';
import { OptionDto } from 'src/resources/poll-options/dto/create-options.dto';
import { PostTypes } from '../service/posts.service';

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

  @IsEnum(PostTypes, {
    message: `Type can only be of values ${JSON.stringify(
      Object.keys(PostTypes)
    )}`
  })
  @IsNotEmpty()
  type: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @ArrayMinSize(2)
  @ArrayMaxSize(9)
  @IsArray()
  @IsOptional()
  options?: OptionDto[];
}
