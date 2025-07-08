import { Expose, Type } from "class-transformer";
import { ResponseUploadFileDto } from "src/common/types/file.interface";

export class UserDto {
  @Expose()
  user_name: string;
}
export class PreservationMeasureDetailDto {

  @Expose()
  @Type(() => UserDto)
  officer: UserDto[]

  @Expose()
  arrival_start_time: string;

  @Expose()
  arrival_end_time: Date;

  @Expose()
  protection_methods: Date;

  @Expose()
  area_covered: string;

  @Expose()
  special_instructions: string;

  @Expose()
  attached_file: ResponseUploadFileDto[];
}