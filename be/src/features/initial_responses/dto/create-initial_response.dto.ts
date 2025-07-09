import { Type } from "class-transformer";
import { IsArray, IsDate, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateMedicalSupportDto } from "src/features/medical_supports/dto/create-medical_support.dto";
import { CreatePreservationMeasureDto } from "src/features/preservation_measures/dto/create-preservation_measure.dto";

export class CreateInitialResponseDto {
  @IsDate()
  dispatching_time: Date;

  @IsDate()
  arrival_time: Date;

  @IsString()
  preliminary_assessment: string;

  @IsUUID()
  case_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePreservationMeasureDto)
  preservation_measures?: CreatePreservationMeasureDto[];
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMedicalSupportDto)
  medical_supports?: CreateMedicalSupportDto[];
}
