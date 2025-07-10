import { Type } from "class-transformer";
import { IsArray, IsDate, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateMultipleMedicalSupportDto } from "src/features/medical_supports/dto/create-medical_support.dto";
import { CreateMultiplePreservationMeasureDto } from "src/features/preservation_measures/dto/create-preservation_measure.dto";

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
  @Type(() => CreateMultiplePreservationMeasureDto)
  preservation_measures?: CreateMultiplePreservationMeasureDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMultipleMedicalSupportDto)
  medical_supports?: CreateMultipleMedicalSupportDto[];
}
