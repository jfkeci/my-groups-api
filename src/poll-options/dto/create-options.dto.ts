import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  ArrayMaxSize,
  ArrayMinSize,
  ValidateNested
} from 'class-validator';

export class OptionDto {
  @IsString()
  option: string;

  @IsNumber()
  poll: number;
}

export class CreatePostDto {
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  @ArrayMinSize(2)
  @ArrayMaxSize(9)
  @IsArray()
  options: OptionDto[];
}
