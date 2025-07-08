import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, ['user_name'] as const) {
    // @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
    // userName: string
}
