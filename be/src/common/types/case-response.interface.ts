
export interface IReportDto {
  reporter_fullname: string;
}

export interface ICaseDetailDto {
  case_id: string;
  crime_type: string;
  severity: string;
  time_occurrence: Date;
  case_location: string;
  case_status: string;
  reports: IReportDto[];
}

export interface PaginatedCasesResult {
  data: ICaseDetailDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IReportDto {
  reporter_fullname: string;
}

export interface ICaseDto {
  case_id: string;
  crime_type: string;
  severity: string;
  time_occurrence: Date;
  case_location: string;
  case_status: string;
  reports: IReportDto[];
}

