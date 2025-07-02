import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../users/users.interface';
import { Response } from 'express';
import { RegisterUserDto } from '../users/dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private rolesService: RolesService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(pass, user.password);
      if (isValid === true) {
        return {
          userName: user.userName,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        };
      }
    }
    return null;
  }

  createdRefreshToken = (payload) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME')
    })
    return refresh_token
  }

  async login(user: IUser, response: Response) {
    const { userName, fullName, avatarUrl, email, phoneNumber, role } = user;
    const payload = {
      userName,
      fullName,
      avatarUrl,
      email,
      phoneNumber,
      role: {
        roleId: role.roleId,
        description: role.description,
      }
    }
    const refresh_token = this.createdRefreshToken(payload);
    await this.usersService.updateUserToken(refresh_token, userName);
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRE'),
    })
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userName,
        fullName,
        avatarUrl,
        email,
        phoneNumber,
        role,
      },
      refresh_token: refresh_token
    };
  }

  async register(user: RegisterUserDto) {
    let userRegister = await this.usersService.register(user);
    return {
      userName: userRegister?.userName,
      createdAt: userRegister?.createdAt,
    }
  }
}
