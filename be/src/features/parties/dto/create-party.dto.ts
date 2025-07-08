import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { GenderType, PartyType } from 'src/common/enum/party.enum';
import { UploadFileDto } from 'src/features/files/dto/response-upload-file.dto';

export class CreatePartyDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEnum(PartyType)
  party_type: PartyType;

  @IsEnum(GenderType)
  gender: GenderType;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  statement: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  attached_file?: UploadFileDto[];
}
