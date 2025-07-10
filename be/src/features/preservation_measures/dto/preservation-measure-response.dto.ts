import { Expose, Type } from 'class-transformer';
import { ResponseUploadFileDto } from 'src/features/files/dto/response-upload-file.dto';

export class UserDto {
  @Expose()
  user_name: string;
}
export class PreservationMeasureDetailDto {
  @Expose()
  preservation_measures_id: string;

  @Expose()
  @Type(() => UserDto)
  responsible_officer: string

  @Expose()
  arrival_start_time: string;

  @Expose()
  arrival_end_time: string;

  @Expose()
  protection_methods: string;

  @Expose()
  area_covered: string;

  @Expose()
  special_instructions: string;

  @Expose()
  @Type(() => ResponseUploadFileDto)
  attached_file: ResponseUploadFileDto[];
}
