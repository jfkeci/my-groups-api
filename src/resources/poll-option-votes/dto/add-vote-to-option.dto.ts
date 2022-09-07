import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddVoteToOptionDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  pollId: number;

  @IsNumber()
  @IsNotEmpty()
  optionId: number;
}
