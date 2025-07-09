import {
  IsOptional,
  IsEnum,
  IsDateString,
  IsEmail,
  IsString,
} from 'class-validator';
import { CrimeType, ReportStatusType, SeverityType  } from 'src/common/enum/report.enum';

export class GetReportsFilterDto {
  @IsOptional()
  @IsEnum(ReportStatusType)
  status?: ReportStatusType;

  @IsOptional()
  @IsEnum(CrimeType)
  crime_type?: CrimeType;

  @IsOptional()
  @IsEnum(SeverityType)
  severity?: SeverityType;

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
