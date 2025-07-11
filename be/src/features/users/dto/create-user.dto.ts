import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
import { UserPositionType } from "src/common/enum/user.enum";

export class CreateUserDto {
  @IsNotEmpty({ message: 'User name is required.' })
  user_name: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  phone_number: string;

  @IsNotEmpty({ message: 'Full name is required.' })
  full_name: string;

  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsNotEmpty({ message: 'Date of birth is required.' })
  date_of_birth: Date;

  @IsNotEmpty({ message: 'Day attended is required.' })
  day_attended: Date;

  @IsNotEmpty({ message: 'Status is required.' })
  status: string;

  @IsNotEmpty({ message: 'Zone is required.' })
  zone: string;

  @IsNotEmpty({ message: 'Role is required.' })
  role_id: string;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'User name is required.' })
  user_name: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  phone_number: string;

  @IsNotEmpty({ message: 'Full name is required.' })
  full_name: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsEmail({}, { message: 'Password must be a valid email.' })
  password: string;

  @IsNotEmpty({ message: 'Position is required.' })
  position: UserPositionType;

  @IsNotEmpty({ message: 'Date of birth is required.' })
  date_of_birth: Date;

  @IsNotEmpty({ message: 'Day attended is required.' })
  day_attended: Date;

  @IsNotEmpty({ message: 'Status is required.' })
  status: string;

  @IsNotEmpty({ message: 'Zone is required.' })
  zone: string;
}

