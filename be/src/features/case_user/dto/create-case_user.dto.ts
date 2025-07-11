import { IsNotEmpty } from "class-validator";

export class CreateCaseUserDto {
  @IsNotEmpty({ message: 'Case ID is required' })
  case_id: string;

  @IsNotEmpty({ message: 'User Name is required' })
  user_name: string;
}