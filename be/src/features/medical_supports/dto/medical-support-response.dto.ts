import { Expose, Type } from "class-transformer";
import { ResponseUploadFileDto } from "src/features/files/dto/response-upload-file.dto";


export class MedicalSupportDtoDetailDto {
  @Expose()
  medical_supports_id: string

  @Expose()
  medical_unit_id: string;

  @Expose()
  support_type: string;

  @Expose()
  personnel_assigned: string;

  @Expose()
  time_of_arrival: string;

  @Expose()
  location_assigned: string;

  @Expose()
  remarks: string;

  @Expose()
  @Type(() => ResponseUploadFileDto)
  scene_sketch_file: ResponseUploadFileDto[];
}