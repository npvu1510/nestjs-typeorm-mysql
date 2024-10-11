import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto as RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { TokenInterceptor } from 'src/common/interceptors/token.interceptor';
import { response } from 'src/utils/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(TokenInterceptor)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseInterceptors(TokenInterceptor)
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);

    return response(data);
  }
}
