import { EvidenceType } from 'src/common/enum/evidence.enum';
import { ResponseUploadFileDto } from 'src/common/types/file.interface';

export class UpdateEvidenceDto {
  evidence_type?: EvidenceType;
  description?: string;
  current_location?: string;
  attached_file?: ResponseUploadFileDto[];
}
