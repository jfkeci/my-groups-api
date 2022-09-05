import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('/register')
  registerUser(@Body() data: RegisterUserDto) {
    return this.authService.registerUser(data);
  }

  @HttpCode(200)
  @Post('/login')
  loginUser(@Body() data: LoginUserDto) {
    return this.authService.loginUser(data);
  }
}
