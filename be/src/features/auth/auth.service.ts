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
          user_name: user.user_name,
          full_name: user.full_name,
          phone_number: user.phone_number,
          date_of_birth: user.date_of_birth,
          day_attended: user.day_attended,
          status: user.status,
          zone: user.zone,
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
    try {
      const { user_name, full_name, phone_number, position, date_of_birth, day_attended, status, zone, role } = user;
      const payload = {
        user_name,
        full_name,
        position,
        date_of_birth,
        day_attended,
        phone_number,
        status,
        zone,
        role: {
          roleId: role.role_id,
          description: role.description,
        }
      }
      const refresh_token = this.createdRefreshToken(payload);
      await this.usersService.updateUserToken(refresh_token, user_name);
      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: this.configService.get<number>('JWT_REFRESH_EXPIRE'),
      })
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          user_name,
          full_name,
          position,
          date_of_birth,
          day_attended,
          phone_number,
          status,
          zone,
          role,
        },
        refresh_token: refresh_token
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // async register(user: RegisterUserDto) {
  //   try {
  //     let userRegister = await this.usersService.register(user);
  //     return {
  //       userName: userRegister?.userName,
  //       createdAt: userRegister?.created_at,
  //     }
  //   } catch (error) {
  //     throw new BadRequestException('Registration failed');
  //   }
  // }
}
