import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CrimeType, RelationIncidentType, SeverityType } from 'src/common/enum/report.enum';
import { CaseStatusType } from 'src/common/enum/case.enum';

export class CreateCaseDto {
  @IsEnum(CrimeType)
  crime_type: CrimeType;

  @IsEnum(SeverityType)
  severity: SeverityType;

  @IsOptional()
  time_occurrence?: Date;

  @IsEnum(RelationIncidentType)
  relation_incident: RelationIncidentType;

  @IsString()
  case_location: string;
}
