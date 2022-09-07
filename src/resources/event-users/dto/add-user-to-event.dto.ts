import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddUserToEventDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  eventId: number;
}
