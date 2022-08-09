import { IsNotEmpty } from 'class-validator';

export class PostTypeIdParamDto {
  @IsNotEmpty()
  postTypeId: string;
}
