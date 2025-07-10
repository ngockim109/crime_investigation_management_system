import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetInitialStatementsFilterDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  captured_by?: string;

  @IsOptional()
  @IsString()
  case_id?: string;

  @IsOptional()
  @IsString()
  collected_from?: string;

  @IsOptional()
  @IsString()
  collected_to?: string;

  @IsOptional()
  @IsString()
  provider_name?: string;

  @IsOptional()
  @IsString()
  recorded_by?: string;

  @IsOptional()
  @IsString()
  date_from?: string;

  @IsOptional()
  @IsString()
  date_to?: string;
}
