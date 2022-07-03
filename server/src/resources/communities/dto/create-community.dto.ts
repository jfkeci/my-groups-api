import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 125)
  title: string;

  @IsNumber()
  @IsNotEmpty()
  createdBy: number;
}
