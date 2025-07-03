import { Attachment } from "../interfaces/attachment.interface";

export class UpdateEvidenceDto {
    type_evidence?: string;
    description?: string;
    current_location?: string;
    attached_file?: Attachment[];
  }