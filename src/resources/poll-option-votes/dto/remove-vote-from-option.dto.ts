import { IsNumber, IsOptional } from 'class-validator';

export class RemoveVoteFromOptionDto {
  @IsNumber()
  @IsOptional()
  voteId?: number;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsNumber()
  @IsOptional()
  pollId?: number;

  @IsNumber()
  @IsOptional()
  optionId?: number;
}
