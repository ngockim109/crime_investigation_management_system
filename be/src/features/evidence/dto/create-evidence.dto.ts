import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEvidenceDto {
  @IsNotEmpty()
  @IsString()
  type_evidence: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  current_location?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments_url?: string[];
}
