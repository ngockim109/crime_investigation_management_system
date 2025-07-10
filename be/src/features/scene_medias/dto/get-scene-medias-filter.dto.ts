import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class GetSceneMediasFilterDto {
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
  scene_media_description?: string;

  @IsOptional()
  @IsString()
  date_from?: string;

  @IsOptional()
  @IsString()
  date_to?: string;
}
