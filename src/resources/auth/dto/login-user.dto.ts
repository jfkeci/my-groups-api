import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ groups: ['login-via-username'] })
  @IsOptional({ groups: ['login-via-email'] })
  @IsString()
  username?: string;

  @IsNotEmpty({ groups: ['login-via-email'] })
  @IsOptional({ groups: ['login-via-username'] })
  @IsString()
  email?: string;

  @IsNotEmpty({ groups: ['login-via-username', 'login-via-email'] })
  @IsString({ message: 'Password should be a valid string' })
  password: string;
}
