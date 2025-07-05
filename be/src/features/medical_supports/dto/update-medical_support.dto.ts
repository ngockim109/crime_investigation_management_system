import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalSupportDto } from './create-medical_support.dto';

export class UpdateMedicalSupportDto extends PartialType(CreateMedicalSupportDto) {}
