import { IsOptional, IsString } from 'class-validator';

export class SearchUsersQueryDto {
  @IsString()
  @IsOptional()
  text: string;
}
