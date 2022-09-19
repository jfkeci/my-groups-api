import { IsNotEmpty, IsNumber } from 'class-validator';

export class ToggleVoteDto {
  @IsNumber()
  @IsNotEmpty()
  option: number;

  @IsNumber()
  @IsNotEmpty()
  user: number;

  @IsNumber()
  @IsNotEmpty()
  poll: number;
}
