import { IsString, IsEnum, IsOptional, IsDateString, ValidateNested, IsArray } from 'class-validator';
import { PartyType } from 'src/common/enum/party.enum';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { UploadFileDto } from 'src/features/files/dto/response-upload-file.dto';
export class CreateInitialStatementDto {
  @IsString()
  provider_name: string;

  @Type(() => Date)  
  @IsDate()
  statement_date: Date;

  @IsString()
  contact_info: string;

  @IsEnum(PartyType)
  person_role: PartyType;

  @IsString()
  statement_content: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  evidence_file_path?: UploadFileDto[];

  @IsOptional()
  @IsString()
  recorded_by?: string;

  @IsOptional()
  @IsString()
  case_id?: string;
}
