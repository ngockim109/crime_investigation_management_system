import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';
import { UploadFileDto } from 'src/features/files/dto/response-upload-file.dto';

export class CreatePreservationMeasureDto {

  @IsString()
  responsible_officer?: string;

  @IsString()
  arrival_start_time: string;

  @IsString()
  arrival_end_time: string;

  @IsString()
  protection_methods: string;

  @IsString()
  area_covered: string;

  @IsString()
  special_instructions: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  attached_file?: ResponseUploadFileDto[];

  @IsUUID()
  initial_responses_id: string;
}

export class CreateMultiplePreservationMeasureDto {

  @IsString()
  responsible_officer?: string;

  @IsString()
  arrival_start_time: string;

  @IsString()
  arrival_end_time: string;

  @IsString()
  protection_methods: string;

  @IsString()
  area_covered: string;

  @IsString()
  special_instructions: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  attached_file?: ResponseUploadFileDto[];
}
