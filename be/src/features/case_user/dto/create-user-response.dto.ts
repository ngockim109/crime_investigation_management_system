import { Expose, Transform, Type } from 'class-transformer';
import { ReportDto } from 'src/features/cases/dto/case-response.dto';

export class CaseUserViewDto {
  @Expose()
  user_name: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.phone_number)
  phone_number: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.full_name)
  full_name: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.role?.description || null)
  description: string;
}

export class CaseUserDto {
  @Expose()
  user_name: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.phone_number)
  phone_number: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.full_name)
  full_name: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.zone)
  zone: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.present_status)
  present_status: string;

  @Expose()
  @Transform(({ obj }) => obj.user?.role?.description || null)
  description: string;
}

export class CaseDto {
  @Expose()
  case_id: string;

  @Expose()
  crime_type: string;

  @Expose()
  severity: string;

  @Expose()
  time_occurrence: Date;

  @Expose()
  case_location: string;

  @Expose()
  case_status: string;

  @Expose()
  @Type(() => ReportDto)
  reports: ReportDto[];
}

