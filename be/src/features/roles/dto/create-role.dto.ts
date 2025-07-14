import { IsEnum, IsNotEmpty } from "class-validator";
import { UserPositionType } from "src/common/enum/user.enum";
import { Permission } from "src/features/permissions/entities/permission.entity";

export class CreateRoleDto {
    @IsEnum(UserPositionType,{ message: 'Description is required' })
    description: UserPositionType;

    // n-n permissions
    @IsNotEmpty({ message: 'Permissions are required' })
    permissions: number[];
}
