import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
