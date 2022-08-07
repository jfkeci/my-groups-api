import { IsNotEmpty } from 'class-validator';

export class CommunityMemberParamsDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  communityId: number;
}
