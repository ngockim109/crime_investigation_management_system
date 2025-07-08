import { Expose, Type } from 'class-transformer';
import { MedicalSupportDtoDetailDto } from 'src/features/medical_supports/dto/medical-support-response.dto';
import { PreservationMeasureDetailDto } from 'src/features/preservation_measures/dto/preservation-measure-response.dto';

export class InitialResponseDetailDto {
  @Expose()
  initial_responses_id: string;

  @Expose()
  dispatching_time: Date;

  @Expose()
  arrival_time: Date;

  @Expose()
  preliminary_assessment: string;

  @Expose()
  case_id: string;

  @Expose()
  @Type(() => PreservationMeasureDetailDto)
  preservation_measures: PreservationMeasureDetailDto[];

  @Expose()
  @Type(() => MedicalSupportDtoDetailDto)
  medical_supports: MedicalSupportDtoDetailDto[];
}
