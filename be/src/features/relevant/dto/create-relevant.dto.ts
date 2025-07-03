import { IsString, IsEnum, IsOptional, IsNotEmpty, IsArray, IsUrl } from 'class-validator';
import { Gender, RelevantType } from '../entities/relevant.entity';

export class CreateRelevantDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEnum(RelevantType)
  type_relevant: RelevantType;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments_url?: string[];
}
