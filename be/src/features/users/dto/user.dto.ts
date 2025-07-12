import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
import { PresentStatusType } from "src/common/enum/case_user.enum";
import { UserPositionType } from "src/common/enum/user.enum";

export class UserDto {
  user_name: string;
  phone_number: string;
  full_name: string;
  password: string;
  position: UserPositionType;
  date_of_birth: Date;
  day_attended: Date;
  status: string;
  zone: string;
  role_in_case: PresentStatusType;

  // @IsNotEmpty({ message: 'Role is required.' })
  // role_id: string;
}

