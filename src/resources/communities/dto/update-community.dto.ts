import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCommunityDto {
  @IsString()
  @IsOptional()
  @Length(2, 125)
  title?: string;

  @IsString()
  @IsOptional()
  @Length(2, 255)
  description?: string;

  @IsString()
  @IsOptional()
  @Length(2, 125)
  image?: string;
}
