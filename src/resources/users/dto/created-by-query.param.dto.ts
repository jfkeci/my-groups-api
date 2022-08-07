import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CraetedByQueryParamDto {
  @Transform(({ value }) => {
    return value ? true : false;
  })
  @IsBoolean()
  @IsOptional()
  createdBy: boolean;
}
