import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseUserDto } from './create-case_user.dto';

export class UpdateCaseUserDto extends PartialType(CreateCaseUserDto) {}
