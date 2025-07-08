import { Expose } from "class-transformer";
import { ResponseUploadFileDto } from "src/common/types/file.interface";

export class MedicalSupportDtoDetailDto {
  @Expose()
  medical_unit_id: string;

  @Expose()
  support_type: Date;

  @Expose()
  personnel_assigned: Date;

  @Expose()
  time_of_arrival: string;

  @Expose()
  location_assigned: string;

  @Expose()
  remarks: string;

  @Expose()
  scene_sketch_file: ResponseUploadFileDto[];

}