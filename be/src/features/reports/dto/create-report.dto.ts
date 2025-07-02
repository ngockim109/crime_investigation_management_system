import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { CrimeType, Severity } from 'src/common/enum/report.enum';

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
}
