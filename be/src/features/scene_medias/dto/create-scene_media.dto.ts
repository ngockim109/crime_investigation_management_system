import { IsString, IsOptional, IsDateString, ValidateNested, IsArray } from 'class-validator';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { UploadFileDto } from 'src/features/files/dto/response-upload-file.dto';


export class CreateSceneMediaDto {
  @Type(() => Date)  
  @IsDate()
  date_taken: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  scene_media_file?: UploadFileDto[];

  @IsString()
  scene_media_description: string;

  @IsOptional()
  @IsString()
  captured_by?: string;

  @IsOptional()
  @IsString()
  case_id?: string;
}
