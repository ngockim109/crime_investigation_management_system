import { Attachment } from '../interfaces/attachment.interface';

export class CreateEvidenceDto {
    type: string;
    location: string = ''; // Giá trị mặc định là chuỗi rỗng
    description: string = ''; // Giá trị mặc định là chuỗi rỗng
    attachments: Attachment[] = []; // Giá trị mặc định là mảng rỗng
  }