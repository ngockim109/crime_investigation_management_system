import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EvidenceType } from 'src/common/enum/evidence.enum';
import { UploadFileDto } from 'src/features/files/dto/response-upload-file.dto';

export class CreateEvidenceDto {
  @IsNotEmpty()
  @IsEnum(EvidenceType)
  evidence_type: EvidenceType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  current_location?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  attached_file?: UploadFileDto[];
}
