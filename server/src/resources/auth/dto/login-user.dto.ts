import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ groups: ['login-via-username'] })
  @IsString()
  username?: string;
  @IsNotEmpty({ groups: ['login-via-password'] })
  @IsString()
  email?: string;
  @IsNotEmpty({ groups: ['login-via-username', 'login-via-password'] })
  @IsString()
  password: string;
}
