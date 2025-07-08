import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Request as REQ, Response } from 'express';
import { RegisterUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ResponseMessage('Login Success')
  @Public()
  @UseGuards(LocalAuthGuard)
  async handleLogin(
    @Request() req: Request & { user },
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(req.user, response)
  }

  // @Public()
  // @ResponseMessage('Register Success')
  // @Post('/register')
  // async handleRegister(@Body() registerUserDto: RegisterUserDto) {
  //   return this.authService.register(registerUserDto)
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
