import { IsNotEmpty, IsNumber } from 'class-validator';

export class ToggleEventUserDto {
  @IsNotEmpty()
  @IsNumber()
  event: number;

  @IsNotEmpty()
  @IsNumber()
  user: number;
}
