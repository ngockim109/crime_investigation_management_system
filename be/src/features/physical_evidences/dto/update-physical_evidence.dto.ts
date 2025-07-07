import { PartialType } from '@nestjs/mapped-types';
import { CreatePhysicalEvidenceDto } from './create-physical_evidence.dto';

export class UpdatePhysicalEvidenceDto extends PartialType(CreatePhysicalEvidenceDto) {}
