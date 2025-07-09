import { IsOptional, IsEnum, IsNumberString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseStatusType } from 'src/common/enum/case.enum';

export class GetCasesFilterDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(CaseStatusType)
  status?: CaseStatusType;

  @IsOptional()
  type_of_crime?: string;

  @IsOptional()
  level_of_severity?: string;

  @IsOptional()
  from_date?: string;

  @IsOptional()
  to_date?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 10;
}
