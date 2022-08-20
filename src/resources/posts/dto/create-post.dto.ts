import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import {
  EventPostStructure,
  PollOption,
  PollPostStructure
} from 'src/resources/post-types/interfaces/post-type.interface';

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
