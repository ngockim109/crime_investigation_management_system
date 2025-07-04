// dto/response-upload-file.dto.ts
import { IsString } from 'class-validator';

export class UploadFileDto {
  @IsString()
  original_name: string;

  @IsString()
  file_url: string;

  @IsString()
  public_id: string;

  @IsString()
  resource_type: string;
}
