import { ResponseUploadFileDto } from 'src/common/types/file.interface';

export interface IMedicalSupportDetailDto {
  medical_unit_id: string;
  support_type: string;
  personnel_assigned: string;
  time_of_arrival: string;
  location_assigned: string;
  remarks: string;
  scene_sketch_file: ResponseUploadFileDto[];
}
