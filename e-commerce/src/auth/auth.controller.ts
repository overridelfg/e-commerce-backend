import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async signIn(@Body() user: {email: string, password: string}) {
    return await this.authService.login(user.email);
  }

  @Post('register')
  async register(@Body() user: {email: string, name: string, password: string}) {
    return await this.authService.register(user.email, user.name, user.password);
  }
}
