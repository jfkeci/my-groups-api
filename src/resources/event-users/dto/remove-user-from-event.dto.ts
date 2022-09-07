import { IsNumber, IsOptional } from 'class-validator';

export class RemoveUserFromEventDto {
  @IsNumber()
  @IsOptional()
  eventUserId?: number;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsNumber()
  @IsOptional()
  eventId?: number;
}
