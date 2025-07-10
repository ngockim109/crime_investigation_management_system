import { ResponseUploadFileDto } from 'src/common/types/file.interface';

export interface IPreservationMeasureDetailDto {
  preservation_measures_id: string;
  arrival_start_time: string;
  arrival_end_time: string;
  protection_methods: string;
  area_covered: string;
  special_instructions: string;
  attached_file: ResponseUploadFileDto[];
  responsible_officer: string;
}
