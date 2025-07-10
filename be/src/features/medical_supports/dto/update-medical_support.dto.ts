import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalSupportDto } from './create-medical_support.dto';
import { IsUUID } from 'class-validator';

export class UpdateMedicalSupportDto extends PartialType(CreateMedicalSupportDto) {
  @IsUUID()
  medical_supports_id: string;
}
