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
  RelationIncidentType,
  SeverityType,
} from 'src/common/enum/report.enum';
import { CreateEvidenceDto } from 'src/features/evidences/dto/create-evidence.dto';
import { CreatePartyDto } from 'src/features/parties/dto/create-party.dto';

export class CreateReportDto {
  @IsEnum(CrimeType)
  crime_type: CrimeType;

  @IsEnum(SeverityType)
  severity: SeverityType;

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
  @IsEnum(RelationIncidentType)
  relation_incident?: RelationIncidentType;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePartyDto)
  parties?: CreatePartyDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEvidenceDto)
  evidences?: CreateEvidenceDto[];
}
