import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length
} from 'class-validator';
import { Match } from 'src/utilities/decorators/validation-match.decorator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 125)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(0, 125)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 125)
  password: string;

  @IsString()
  @Length(8, 125)
  @Match('password', { message: 'Password confirmation must match password' })
  confirmPassword: string;

  @IsString()
  @IsOptional()
  @Length(0, 125)
  firstName?: string;

  @IsString()
  @IsOptional()
  @Length(0, 125)
  lastName?: string;

  @IsString()
  @IsOptional()
  birthdate?: string;

  @IsString()
  @IsOptional()
  @Length(0, 300)
  bio?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;

  @IsNumber()
  @IsOptional()
  adminVaucher?: number;
}
