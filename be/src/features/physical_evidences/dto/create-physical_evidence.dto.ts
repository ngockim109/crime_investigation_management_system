import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreatePhysicalEvidenceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  identification_code: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  scene_location: string;

  @IsDateString()
  @IsNotEmpty()
  collected_time: string;

  @IsString()
  @IsNotEmpty()
  scene_description: string;

  @IsString()
  @IsNotEmpty()
  initial_condition: string;

  @IsString()
  @IsNotEmpty()
  preservation_measures: string;

  @IsOptional()
  @IsString()
  case_id?: string;

  @IsOptional()
  @IsString()
  collector_username?: string;
}
