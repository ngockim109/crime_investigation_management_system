import { Expose, Type } from 'class-transformer';

export class ReportDto {
  @Expose()
  reporter_fullname: string;
}

export class CaseDetailDto {
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
