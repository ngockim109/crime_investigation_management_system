import { IsNotEmpty } from "class-validator";
import { Permission } from "src/features/permissions/entities/permission.entity";

export class CreateRoleDto {
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    // n-n permissions
    @IsNotEmpty({ message: 'Permissions are required' })
    permissions: number[];
}
