import { IsNotEmpty, IsOptional } from "class-validator";

export class GetUserFilter {

    @IsOptional()
    currentPage: number;

    @IsOptional()
    position: string

    @IsOptional()
    pageSize: number

    @IsOptional()
    full_name: string

    // @IsNotEmpty({ message: 'Role is required.' })
    // role_id: string;
}