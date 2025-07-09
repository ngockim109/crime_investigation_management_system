import { ResponseUploadFileDto } from 'src/common/types/file.interface';

export interface IUserDto {
  user_name: string;
}

export interface IPreservationMeasureDetailDto {
  arrival_start_time: string;
  arrival_end_time: Date;
  protection_methods: Date;
  area_covered: string;
  special_instructions: string;
  attached_file: ResponseUploadFileDto[];
  officer: IUserDto[];
}
