import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { MedicalType } from 'src/common/enum/medical.enum';
import { Type } from 'class-transformer';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';
import { UploadFileDto } from 'src/features/files/dto/response-upload-file.dto';

export class CreateMedicalSupportDto {
  @IsString()
  medical_unit_id: string;

  @IsEnum(MedicalType)
  support_type: MedicalType;

  @IsString()
  personnel_assigned: string;

  @IsString()
  time_of_arrival: string;

  @IsString()
  location_assigned: string;

  @IsString()
  remarks: string;

  @IsString()
  created_by: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  scene_sketch_file: ResponseUploadFileDto[];

  @IsUUID()
  initial_responses_id: string;
}

export class CreateMultipleMedicalSupportDto {
  @IsString()
  medical_unit_id: string;

  @IsEnum(MedicalType)
  support_type: MedicalType;

  @IsString()
  personnel_assigned: string;

  @IsString()
  time_of_arrival: string;

  @IsString()
  location_assigned: string;

  @IsString()
  remarks: string;

  @IsString()
  created_by: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  scene_sketch_file: ResponseUploadFileDto[];
}