import { ExtractJwt, Strategy } from 'passport-jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IUser } from 'src/features/users/users.interface';
import { UsersService } from 'src/features/users/users.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')!,
    });
  }

  async validate(payload: IUser) {
    const { userName, fullName, avatarUrl, email, phoneNumber, role } = payload;
    const user = await this.usersService.findOneByUsername(userName);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return {
      userName,
      fullName,
      avatarUrl,
      email,
      phoneNumber,
      role,
      permissions: user.role.permissions
    }
  }
}
