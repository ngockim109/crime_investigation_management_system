import { IsEnum } from 'class-validator';
import { ReportStatusType } from 'src/common/enum/report.enum';

export class UpdateStatusReportDto {
  @IsEnum(ReportStatusType)
  status: ReportStatusType;
}
