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
    const { user_name, full_name, position, date_of_birth, day_attended, phone_number, status, zone, role } = payload;
    const user = await this.usersService.findOneByUsername(user_name);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return {
      user_name,
      full_name,
      position,
      date_of_birth,
      day_attended,
      phone_number,
      status,
      zone,
      role,
      permissions: user.role.permissions
    }
  }
}
