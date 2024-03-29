import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserIdParamDto {
  @IsNotEmpty()
  userId: number;
}
