import { PartialType } from '@nestjs/mapped-types';
import { CreatePreservationMeasureDto } from './create-preservation_measure.dto';

export class UpdatePreservationMeasureDto extends PartialType(CreatePreservationMeasureDto) {}
