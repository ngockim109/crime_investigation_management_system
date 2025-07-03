import { Attachment } from '../interfaces/attachment.interface';

export class CreateEvidenceDto {
    type_evidence: string;
    description: string = ''; 
    current_location: string = ''; 
    attached_file: Attachment[] = [];
  }

