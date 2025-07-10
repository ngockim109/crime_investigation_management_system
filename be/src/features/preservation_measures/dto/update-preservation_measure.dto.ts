import { PartialType } from '@nestjs/mapped-types';
import { CreatePreservationMeasureDto } from './create-preservation_measure.dto';
import { IsUUID } from 'class-validator';

export class UpdatePreservationMeasureDto extends PartialType(CreatePreservationMeasureDto) {
  @IsUUID()
  preservation_measures_id: string;
}
