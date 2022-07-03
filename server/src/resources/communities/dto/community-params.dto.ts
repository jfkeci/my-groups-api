import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommunityIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  communityId: number;
}

export class CommunityUserParamDto {
  @IsNumber()
  @IsNotEmpty()
  communityId: number;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
