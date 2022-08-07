import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserCommunityParamsDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  communityId: number;
}
