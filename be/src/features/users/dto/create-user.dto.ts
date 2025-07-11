import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { UserPositionType, UserAccountStatusType } from 'src/common/enum/user.enum';
import { PresentStatusType } from 'src/common/enum/case_user.enum';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserPositionType)
    position: UserPositionType;

    @Type(() => Date)  
    @IsDate()
    date_of_birth: Date;

    @IsEnum(UserAccountStatusType)
    account_status: UserAccountStatusType;

    @IsEnum(PresentStatusType)
    present_status: PresentStatusType;

    @IsEnum(PresentStatusType)
    role_in_case: PresentStatusType;

    @IsString()
    phone_number: string;

    @IsString()
    zone: string;
}
