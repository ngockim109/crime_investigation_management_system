import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetPhysicalEvidencesFilterDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  identification_code?: string;

  @IsOptional()
  @IsString()
  scene_location?: string;

  @IsOptional()
  @IsString()
  collector_username?: string;

  @IsOptional()
  @IsString()
  case_id?: string;

  @IsOptional()
  @IsString()
  collected_from?: string;

  @IsOptional()
  @IsString()
  collected_to?: string;
}
