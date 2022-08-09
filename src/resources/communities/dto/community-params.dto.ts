import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommunityIdParamDto {
  @IsNotEmpty()
  communityId: string;
}

export class CommunityUserParamDto {
  @IsNotEmpty()
  communityId: string;

  @IsNotEmpty()
  userId: string;
}
