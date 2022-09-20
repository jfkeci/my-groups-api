import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommunityUserDto {
  @IsNumber()
  @IsNotEmpty()
  user: number;

  @IsNumber()
  @IsNotEmpty()
  community: number;
}
