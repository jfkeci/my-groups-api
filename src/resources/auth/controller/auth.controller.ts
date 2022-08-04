import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() data: RegisterUserDto) {
    return this.authService.registerUser(data);
  }

  @Post('/login')
  loginUser(@Body() data: LoginUserDto) {
    return this.authService.loginUser(data);
  }

  @Get('/verify/:userId/:token')
  verifyEmail(@Param() params: VerifyEmailDto) {
    return this.authService.verifyEmail(params);
  }
}
