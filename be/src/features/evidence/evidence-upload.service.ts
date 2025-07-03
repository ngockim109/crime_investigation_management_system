import { Injectable } from '@nestjs/common';
import { UploadHelperService } from '../cloudinary/upload-helper.service';
import { Attachment } from './interfaces/attachment.interface';
import { Multer } from 'multer';

@Injectable()
export class EvidenceUploadService {
  constructor(private readonly uploadHelperService: UploadHelperService) {}

  async uploadMultipleFiles(files: Multer.File[]): Promise<Attachment[]> {
    const results = await this.uploadHelperService.uploadMultipleFiles(files, 'evidence');
    return results.map((result, index) => ({
      originalname: files[index].originalname,
      image_url: result.image_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    }));
  }

  async uploadEvidenceFiles(files: Multer.File[]): Promise<Attachment[]> {
    return this.uploadMultipleFiles(files);
  }
} 