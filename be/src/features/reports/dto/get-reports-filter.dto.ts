import {
  IsOptional,
  IsEnum,
  IsDateString,
  IsEmail,
  IsString,
} from 'class-validator';
import { CrimeType, ReportStatus, Severity } from 'src/common/enum/report.enum';

export class GetReportsFilterDto {
  @IsOptional()
  @IsEnum(ReportStatus)
  status?: ReportStatus;

  @IsOptional()
  @IsEnum(CrimeType)
  crime_type?: CrimeType;

  @IsOptional()
  @IsEnum(Severity)
  severity?: Severity;

  @IsOptional()
  @IsDateString()
  created_from?: string;

  @IsOptional()
  @IsDateString()
  created_to?: string;

  @IsOptional()
  @IsEmail()
  reporter_email?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
