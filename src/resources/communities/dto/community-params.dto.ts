import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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

export class OptionalCommunityDto {
  @IsNumber()
  @IsOptional()
  community?: number;
}
