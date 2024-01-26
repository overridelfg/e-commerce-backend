import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async signIn(@Body() user: {email: string, password: string}) {
    return await this.authService.login(user.email, user.password);
  }

  @Post('register')
  async register(@Body() user: {email: string, password: string}) {
    console.log(user.email);
    return await this.authService.register(user.email, user.password);
  }
}
