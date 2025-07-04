import { Report } from 'src/features/reports/entities/report.entity';

export interface PaginatedReportsResult {
  data: Report[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
