import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import {
  CrimeType,
  RelationIncident,
  Severity,
} from 'src/common/enum/report.enum';
import { CreateEvidenceDto } from 'src/features/evidence/dto/create-evidence.dto';
import { CreateRelevantDto } from 'src/features/relevant/dto/create-relevant.dto';

export class CreateReportDto {
  @IsEnum(CrimeType)
  crime_type: CrimeType;

  @IsEnum(Severity)
  severity: Severity;

  @IsString()
  description: string;

  @IsString()
  case_location: string;

  @IsString()
  reporter_fullname: string;

  @IsEmail()
  reporter_email: string;

  @IsOptional()
  @IsString()
  reporter_phonenumber?: string;

  @IsOptional()
  @IsString()
  suspect_fullname?: string;

  @IsOptional()
  @IsString()
  physical_description?: string;

  @IsOptional()
  @IsString()
  contact_information?: string;

  @IsOptional()
  @IsString()
  means_of_transport?: string;

  @IsOptional()
  @IsString()
  time_occurrence?: string;

  @IsOptional()
  @IsString()
  relation_incident?: RelationIncident;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRelevantDto)
  relevants?: CreateRelevantDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEvidenceDto)
  evidences?: CreateEvidenceDto[];
}
