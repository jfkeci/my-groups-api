import { Type } from 'class-transformer';
import {
  IsArray,
  IsString,
  ArrayMaxSize,
  ArrayMinSize,
  ValidateNested
} from 'class-validator';

export class OptionDto {
  @IsString()
  option: string;
}

export class CreatePostDto {
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @ArrayMinSize(2)
  @ArrayMaxSize(9)
  @IsArray()
  options: OptionDto[];
}
