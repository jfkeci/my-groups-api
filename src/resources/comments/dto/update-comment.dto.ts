import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 125)
  text: string;

  @IsNumber()
  @IsOptional()
  community?: number;
}
