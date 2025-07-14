import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Request as REQ, Response } from 'express';
import { RegisterUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { IUser } from '../users/users.interface';
import { RolesService } from '../roles/roles.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private rolesService: RolesService
  ) { }

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

  @ResponseMessage("Get user information")
  @Get('account')
  async handleGetAccount(@User() user: IUser) {
    const temp = await this.rolesService.findOne(user?.role?.role_id) as any;
    user.role.permissions = temp.permissions;
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
