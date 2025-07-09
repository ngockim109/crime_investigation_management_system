import { IsDate, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserAccountStatusType, UserPositionType } from 'src/common/enum/user.enum';
import { PresentStatusType } from 'src/common/enum/case_user.enum';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  user_name: string;

  @IsString()
  password: string;

  @IsEnum(UserPositionType)
  position: UserPositionType;

  @IsDate()
  date_of_birth: Date;

  @IsDate()
  day_attended: Date;

  @IsEnum(UserAccountStatusType)
  account_status: UserAccountStatusType;

  @IsEnum(PresentStatusType)
  present_status: PresentStatusType;

  @IsEnum(PresentStatusType)
  role_in_case: PresentStatusType;

  @IsString()
  @Length(1, 100)
  phone_number: string;

  @IsString()
  @Length(1, 100)
  zone: string;
}
